/// <reference types="cypress" />

const {LOGIN} = require('./selectors/selector_login');


describe('Tracking time in a Project', () => {
  context('before each test using closure variables', () => {
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
    
    describe('the login page', () => {

      it('the login is succefull when the email and password are valid', () => {
        cy.visit(app.url)

        cy.get(LOGIN.EMAIL).type(user.email)
        cy.get(LOGIN.PASS).type(`${user.pass}{enter}`)

        cy.url().should('include', app.main_section_path)
        cy.getCookie(app.logged_cookie_name).should('exist')
      })

      

    })
  })
})
