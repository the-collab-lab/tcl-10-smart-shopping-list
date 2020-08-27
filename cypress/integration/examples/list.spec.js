Cypress.Commands.add('setLocalStorageToken', () => {
    window.localStorage.setItem('token', 'simple cola jumper')
})

Cypress.Commands.add('removeLocalStorageToken', () => {
    window.localStorage.removeItem('token')
})

beforeEach(() => {
    cy.removeLocalStorageToken()
    cy.setLocalStorageToken()
    cy.visit('list')
})

describe('new test', () => {
    it('focuses the input on load', () => {
        
       
        cy.focused()
            .should('have.class', 'list-search-field')
    })

    it('types into input', () => {
        const typedText = 'hoisin'

        cy.get('.list-search-field')
            .type(typedText)
            .should('have.value', typedText)
    })
})