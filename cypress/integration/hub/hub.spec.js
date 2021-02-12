describe('Hub', () => {

  beforeEach(() => {
    cy.visit('/');
  })

  context("navigation behaviour", () => {
    it('closes when you click the overlay', () => {
        cy.get('.hubBackground').click({force : true});
        cy.get('.hub').should('not.be.visible');
    })

    it('changes overlay content when you select the correct tabs', () => {
        cy.get('.hubTab').eq(1).click();
        cy.get('.hub_templates').should('be.visible');
        cy.get('.hubTab').eq(2).click();
        cy.get('.hub_templates').should('not.be.visible');
        cy.get('.hub_guides').should('be.visible');
        cy.get('.hubTab').eq(0).click();
        cy.get('.hub_guides').should('not.be.visible');
        cy.get('.hub_home').should('be.visible');
    })

  })
  
})