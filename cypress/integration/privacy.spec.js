

Cypress._.times(5, () => {
    it('Privacy Page Test', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})