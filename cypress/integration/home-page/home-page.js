describe("My home page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  /*
   * TODO: make this test work
   */
  it("Renders blog posts", () => {
    cy.get("article header")
      .findByText(/podcast/i)
      .should("exist")
  })
})
