import { writeToFirestore, db } from '../../../src/lib/firebase'

let token = 'test-token'
const docs = [
    {name: 'Red Pepper'},
    {name: 'Cake Mix'},
    {name: 'Salt'},
    {name: 'Hoisin Sauce'},
    {name: 'Oranges'},
    {name: 'Pears'},
    {name: "Peas"},
    { name: "Bob's Oats"}
]

Cypress.Commands.add('setLocalStorageToken', () => {
    window.localStorage.setItem('token', token)
})

Cypress.Commands.add('removeLocalStorageToken', () => {
    window.localStorage.removeItem(token)
})

Cypress.Commands.add('setupFirestoreMock', () => {
    docs.forEach(({name}) => {
        writeToFirestore(token, {
            name,
            purchaseDates: [],
            frequency: 7
        })
    })
})

Cypress.Commands.add('cleanupFirestoreMock', () => {
    db.collection(token)
        .get()
        .then(res => {
            res.forEach(element => {
                element.ref.delete()
            })
        })
})





beforeEach(function(){
    cy.cleanupFirestoreMock()
    cy.removeLocalStorageToken()
    cy.setupFirestoreMock()
    cy.setLocalStorageToken()
    cy.visit('list')
})

describe('new test', () => {
    it(`Checks that the input with the class 'list-search-field' is focused`, () => {
        cy.focused()
            .should('have.class', 'list-search-field')
    })

    it('Makes sure the input element exists in the DOM', () => {
        cy.get('.list-search-field')
            .should('exist')
    })

    it('Typed input contains results only from typed text', () => {
        let typedText = 'hoisin'

        // first case   
        cy.get('.list-search-field')
            .type(typedText)
            .should('have.value', typedText)

        cy.contains("Hoisin Sauce")
        cy.contains("Red Pepper").should("not.exist")
        cy.contains("Cake Mix").should("not.exist")
        cy.contains("Salt").should("not.exist")
        cy.contains("Oranges").should("not.exist")

        cy.get('.list-search-field').clear()

        // second case
        typedText = 'pe'
        
        cy.get('.list-search-field')
            .type(typedText)
            .should('have.value', typedText)
        
        cy.contains("Red Pepper")
        cy.contains("Pears")
        cy.contains("Peas")

        cy.contains("Hoisin Sauce").should("not.exist")
        cy.contains("Cake Mix").should("not.exist")
        cy.contains("Salt").should("not.exist")
        cy.contains("Oranges").should("not.exist")
    })

    it(`A user can click a button to clear the input field text if the value isn't an empty string`, () => {
        let typedText = 'red'


        let input = cy.get('input')

        input
            .type(typedText)

        cy.get('button').click()

        input.should('have.value', '')
    })
    
    it(`If input field is an empty string, button should be disabled`, () => {
        let input = cy.get('input')
        let button = cy.get('button')

        input.should('have.value', '')
        button.should('have.attr', 'disabled')
    })
})