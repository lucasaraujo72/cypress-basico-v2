// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('First')
    cy.get('#lastName').type('Last')
    cy.get('#email').type('test@test.com')
    cy.get('#open-text-area').type('Test')
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldsbyArgs', (first, last) => {
    cy.get('#firstName').type(first)
    cy.get('#lastName').type(last)
    cy.get('#email').type('test@test.com')
    cy.get('#open-text-area').type('Test')
    cy.get('button[type="submit"]').click()
})