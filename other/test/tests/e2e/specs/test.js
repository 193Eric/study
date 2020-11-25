// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'msg mounted')

    cy.get('button').click() 
    cy.contains('h1', 'click msg')


  })
})
