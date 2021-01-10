/// <reference types="cypress" />

const {LOGIN} = require('./selectors/login');
const {MENU} = require('./selectors/menu');
const {CLIENT} = require('./selectors/client');


describe('Tracking time in a Project', () => {

  context('Valid User', () => {
    let app
    let user

    beforeEach(() => {
      cy.fixture('app').then((data) => {
        app = data
      })

      cy.fixture('user').then((data) => {
        user = data
      })
    })

    describe('The login page', () => {

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

    describe('The Client page', () => {

      it('Validate client "Lemontech" exists', () => {

        // Go to client page
        cy.get(MENU.ADMIN).click()
        cy.get(MENU.ADMIN_OPTION_CLIENT).click()
        cy.url().should('include', app.clients_section_path)


      })
    })
  })
})
