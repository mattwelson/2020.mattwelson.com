describe('My home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  /*
   * TODO: make this test work
   */
  it('Contains copyright year', () => {
    cy.get('header').findByText(/gatsby/i).should('exist')
  })
})