describe('Home page', () => {

    const THREE_SECONDS_IN_MS = 3000
    beforeEach(() => {
      // @ts-ignore
      cy.visit('./src/index.html')
    })
    it('Validate application title', () => {
        //cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 

    it('Type and click data', () => {
        //const longText = 'Test test test test test test test test test test test.'
        const longText2 = Cypress._.repeat('0a1b2c4d ', 10)
        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')
        cy.get('#email').type('test@test.com')
        cy.get('#open-text-area').type(longText2, { delay: 50})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')

    })

    it('Validate email error message', () => {
        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')
        cy.get('#email').type('test@@test.com.com')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })


    it('Phone should be empty', () => {
        cy.get('#phone')
            .type('adadaegfeg')
            .should('have.value', '')
    })


    it('Validate email error message', () => {
        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')
        cy.get('#email').type('test@test.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('test')

        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        //cy.get('.error').should('have.value', 'Valide os campos obrigatórios!')

    })


    it('Execution by custom command', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('Execution by custom command with Args', () => {
        cy.fillMandatoryFieldsbyArgs('Carl','Nuremberg')
        cy.get('.success').should('be.visible')
    })


    it('Select the product Youtube by text', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })


    it('Select the product Mentoria by value', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })


    it('Select the product Blog by index', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Select radio button - type feedback', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

    })

    it('Select each radio button option', () => {
        cy.get('input[type="radio"][name="atendimento-tat"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })

    })


    it('Select both checkboxes and uncheck the last option', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    
    it('Attach a file', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('Simulating a drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })


    it('Attach a doc with alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Working with a different page', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })

    it('Access policy page and validate text', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })


    Cypress._.times(3, () => {
        it('Display the message for 3 secs', () => {
            cy.clock()        
            cy.fillMandatoryFieldsAndSubmit()
            cy.get('.success').should('be.visible')
            cy. tick(THREE_SECONDS_IN_MS)
            cy.get('.success').should('not.be.visible')
        })
    })

    //it.only('', () => {

    //})

    it('Using the invoke - show + hide message', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })


    it('Fill the text are with the invoke command', function() {
        const myText = Cypress._.repeat('text value 012345', 10)
        cy.get('#open-text-area')
            .invoke('val', myText)
            .should('have.value', myText)
    })

    it('Call a endpoint and validate the response code and more', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                console.log(response)
                const {status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it.only('Find the cat', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        
    })


}) 