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
    // Firestore gives us 20,000 writes/deletes per day

    // Seems like there's a better way to do this by stubbing the tests
    // Instead of directly accessing the database
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





beforeEach(() => {
    cy.cleanupFirestoreMock()
    cy.removeLocalStorageToken()
    cy.setupFirestoreMock()
    cy.setLocalStorageToken()
    cy.visit('list')
})

describe('Test the List.js component', () => {
    it('Checks the input element exists in the DOM', () => {
        cy.get('.list-search-field')
            .should('exist')
    })

    it(`Checks that the input with the class 'list-search-field' is focused`, () => {
        cy.focused()
            .should('have.id', 'search-field')
    })

    describe('Checks that the typed input contains results only from typed text', () => {
        
        it('First Case', () => {

            let typedText = 'hoisin'
    
            cy.get(`input[id*="search-field"]`)
                .type(typedText)
                .should('have.value', typedText)
    
            cy.contains("Hoisin Sauce")
            cy.contains("Red Pepper").should("not.exist")
            cy.contains("Cake Mix").should("not.exist")
            cy.contains("Salt").should("not.exist")
            cy.contains("Oranges").should("not.exist")
    
        })

        it("Second Case", () => {

            let typedText = 'pe'
            cy.get(`input[id*="search-field"]`)
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
        
    })

    it(`Checks that a user can click a button to clear the input field text if the value isn't an empty string`, () => {
        let typedText = 'red'


        let input = cy.get(`input[id*="search-field"]`)

        input
            .type(typedText)

        cy.get('button').click()

        input.should('have.value', '')
    })
    
    it(`Checks that the 'x' button is disabled if the input field is an empty string, `, () => {
        let input = cy.get(`input[id*="search-field"]`)
        let button = cy.get(`button[id*="clear-search-field"]`)

        input.should('have.value', '')
        button.should('have.attr', 'disabled')
    })
})