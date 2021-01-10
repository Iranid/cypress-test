/// <reference types="cypress" />

import {new_project, generate_random_hour} from "../support/utils";

const {LOGIN} = require('./selectors/login');
const {MENU} = require('./selectors/menu');
const {CLIENT} = require('./selectors/client');
const {PROJECT} = require('./selectors/project');
const {CALENDAR} = require('./selectors/calendar');
const {REPORT} = require('./selectors/report');


describe('Tracking time in a Project', () => {

  context('Valid User', () => {
    let app, user, client, project, calendar, new_project_name, time_entry_hours

    before(() => {

      // Load fixtures
      cy.fixture('app').then((app_data) => {
        cy.fixture('user').then((user_data) => {
          cy.fixture('client').then((client_data) => {
            cy.fixture('project').then((project_data) => {
              cy.fixture('calendar').then((calendar_data) => {

                app      = app_data
                user     = user_data
                client   = client_data
                project  = project_data
                calendar = calendar_data

                // Set new project data
                new_project_name = new_project(project.name)
                time_entry_hours = generate_random_hour(app.time_entry.min_hours, app.time_entry.max_hours,
                                                        app.time_entry.min_mints, app.time_entry.max_mints)
                console.log('new_project_name: ', new_project_name, ', time_entry_hours: ', time_entry_hours)

                // Clean before starting tests
                cy.clean_workspace(app, project);
              })
            })
          })
        })
      })
    })

    context('The Login page', () => {

      it('Login is successful when the email and password are valid', () => {
        cy.visit(app.login_url)

        // Submit the login form
        cy.get(LOGIN.EMAIL).type(user.email)
        cy.get(LOGIN.PASS).type(`${user.pass}{enter}`)

        // Check user is logged-in
        cy.url().should('include', app.main_section_path)
        cy.getCookie(app.logged_cookie_name).should('exist')
      })
    })

    context('The Client page', () => {

      it('Validates client "Lemontech" with correct code exists', () => {

        // Go to client page
        cy.get(MENU.ADMIN).click()
        cy.get(MENU.ADMIN_OPTION_CLIENT).click()
        cy.url().should('include', app.clients_section_path)

        // Search for client
        cy.get(CLIENT.SEARCH_INPUT)
          .type((`${client.name}{enter}`))

        // Check for the correct client on list
        cy.get(CLIENT.CLIENTS_TABLE)
          .should('be.visible')
          .each(($el, index, $list) => {

            cy.wrap($el)
              .find(CLIENT.CLIENT_TDATA)
              .eq(0)
              .then(($name) => {

                if ($name.text() == client.name) {

                  cy.wrap($name)
                    .contains(client.name)

                  cy.wrap($el)
                    .find(CLIENT.CLIENT_TDATA)
                    .eq(2)
                    .contains(client.code)
                }
              })
          })
      })
    })

    context('The Project page', () => {

      it('Creates a new project', () => {

        // Go to project page
        cy.get(MENU.ADMIN).click()
        cy.get(MENU.ADMIN_OPTION_PROJECT).click()
        cy.url().should('include', app.projects_section_path)

        // Got to new project page
        cy.get(PROJECT.ADD_PROJECT_BUTTON).click()
        cy.url().should('include', app.new_project_section_path)

        // Add new project
        cy.get(PROJECT.PROJECT_NAME).type(new_project_name)
        cy.get(PROJECT.PROJECT_DESCRIPTION).type(project.description)

        cy.get(PROJECT.PROJECT_SELECT).click()
        cy.get(PROJECT.PROJECT_SELECT_OPTIONS)
          .each(($el, index, $list) => {
            if ($el.text() == client.name) {
              cy.wrap($el).click()
            }
          })

        // Save project
        cy.get(PROJECT.SAVE_BUTTON).click()
        cy.get(MENU.NOTIFICATION_CLOSE).click()
      })
    })

    context('The Calendar page', () => {

      it('Creates a new time entry', () => {

        // Go to calendar page
        cy.get(MENU.MANAGEMENT).click()
        cy.get(MENU.MANAGEMENT_OPTION_CALENDAR).click()
        cy.url().should('include', app.calendar_section_path)

        // Init time entry form
        cy.get(CALENDAR.ADD_TIME_ENTRY).click()

        // Set project
        cy.get(CALENDAR.SEARCH_PROJECT_INPUT).type(new_project_name)
        cy.get(CALENDAR.SELECT_PROJECT_OPTION)
          .each(($el, index, $list) => {
            if ($el.text() == new_project_name) {
              cy.wrap($el).click()
            }
          })

        // Set description
        cy.get(CALENDAR.TIME_ENTRY_DESCRIPTION).type(calendar.description)

        // Set hours
        cy.get(CALENDAR.TIME_ENTRY_HOURS_BUTTONS)
          .each(($el, index, $list) => {
            cy.wrap($el).type(time_entry_hours[index])
          })

        // Save time entry
        cy.get(CALENDAR.BUTTONS).contains(calendar.save_button).click()
      })
    })
  })
})
