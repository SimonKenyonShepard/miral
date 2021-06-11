

describe('Tools', () => {

  beforeEach(() => {
    window.localStorage.setItem("miral_isFirstUse", true);
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.Math, 'random').returns(0.7)
      }
    });
    cy.get('.hubBackground').click({force : true});
  })

  context("creating a dice", () => {

    it('draws a dice on the canvas when clicked', () => {
        cy.get('.toolbar_more').click();
        cy.get('.toolbar_dice').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
    })

    it('has the correct number of circles on the dice', () => {
      cy.get('.toolbar_more').click();
      cy.get('.toolbar_dice').click();
      cy.get('#drawCanvas').click(300, 300);
      cy.get('g g circle').should('have.length', 5);
      cy.get('g g circle')
        .eq(0)
        .should('have.attr', 'cx', '10')
        .should('have.attr', 'cy', '10')
      cy.get('g g circle').eq(1)
        .should('have.attr', 'cx', '10')
        .should('have.attr', 'cy', '30');
      cy.get('g g circle').eq(2)
        .should('have.attr', 'cx', '20')
        .should('have.attr', 'cy', '20');
      cy.get('g g circle').eq(3)
        .should('have.attr', 'cx', '30')
        .should('have.attr', 'cy', '10');
      cy.get('g g circle').eq(4)
        .should('have.attr', 'cx', '30')
        .should('have.attr', 'cy', '30');

    })

  })
  
   
  
})