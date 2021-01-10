/// <reference types="cypress" />

const {LOGIN} = require('./selectors/login');
const {MENU} = require('./selectors/menu');
const {CLIENT} = require('./selectors/client');
const {PROJECT} = require('./selectors/project');
const {CALENDAR} = require('./selectors/calendar');
const {REPORT} = require('./selectors/report');


describe('Tracking time in a Project', () => {

  context('Valid User', () => {
    let app, user, client

    beforeEach(() => {

      // Load fixtures
      cy.fixture('app').then((data) => {
        app = data
      })

      cy.fixture('user').then((data) => {
        user = data
      })

      cy.fixture('client').then((data) => {
        client = data
      })
    })

    context('The login page', () => {

      it('Login is succesful when the email and password are valid', () => {
        cy.visit(app.login_url)

        // Submit the form
        cy.get(LOGIN.EMAIL).type(user.email)
        cy.get(LOGIN.PASS).type(`${user.pass}{enter}`)

        // Check user is logged-in
        cy.url().should('include', app.main_section_path)
        cy.getCookie(app.logged_cookie_name).should('exist')
      })
    })

    context('The Client page', () => {

      it('Validate client "Lemontech" exists', () => {

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
  })
})
