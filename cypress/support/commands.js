// Custom commands

Cypress.Commands.add('clean_workspace', (app, project) => {

  // Logout and clean session
  cy.visit(app.logout_url)
  cy.delete_project(project)
})

Cypress.Commands.add('delete_project', (project) => {

})
