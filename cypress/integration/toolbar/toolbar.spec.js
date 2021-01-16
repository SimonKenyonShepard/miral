describe('Toolbar', () => {
  beforeEach(() => {
    window.localStorage.setItem("miral_isFirstUse", true);
    cy.visit('/');
  })
  context("creating new shapes", () => {
    it('activates the drawCanvas when clicked', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').should('be.visible');
    })
    it('shows and hides the sub menu', () => {
        cy.get('.toolbar_shape').click();
        cy.get('.toolbar_subMenu_shape').should('be.visible');
        cy.get('#drawCanvas').click(300, 300);
        cy.get('.toolbar_subMenu_shape').should('be.not.visible');
    })
    it('changes the sub menu when another tools is clicked', () => {
        cy.get('.toolbar_shape').click();
        cy.get('.toolbar_subMenu_shape').should('be.visible');
        cy.get('.toolbar_postit').click();
        cy.get('.toolbar_subMenu_shape').should('be.not.visible');
        cy.get('.toolbar_subMenu_postit').should('be.visible');
    })
    it('deselects the selected elements when clicked', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('.toolbar_shapeRect').eq(0).click();
        cy.get('.elementsHightlight').should('be.not.visible');
    })
    it('remembers the last tool used and changes the icon', () => {
        cy.get('.toolbar_shape').click();
        cy.get('.toolbar_shapeCircle').eq(0).click();
        cy.get('.toolbar_subMenu_shape').should('be.not.visible');
        cy.get('.toolbar_shapeCircle').eq(0).should('be.visible');
        cy.get('#drawCanvas').click(300, 300);
        cy.get('.toolbar_shapeCircle').eq(0).should('be.visible');
        cy.get('.toolbar_postit').click();
        cy.get('#drawCanvas').click(400, 400);
        cy.get('.toolbar_shapeCircle').eq(0).should('be.visible');
    })
    it('does not change the icon when the more tool is used', () => {
        cy.get('.toolbar_more').click();
        cy.get('.toolbar_slide').eq(0).click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('.toolbar_more').should('be.visible');
    })
    // it('creates a shape of the correct size when dragged', () => {
    //     cy.get('.toolbar_shape').click();
    //     cy.get('#drawCanvas')
    //         .trigger('mousedown', { clientX: 300, clientY: 300, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 301, clientY: 301, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 302, clientY: 302, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 303, clientY: 303, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 304, clientY: 304, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 305, clientY: 305, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 306, clientY: 306, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 307, clientY: 307, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 308, clientY: 308, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 309, clientY: 309, movementX: 1, movementY: 1 })
    //         .trigger('mousemove', { clientX: 310, clientY: 310, movementX: 1, movementY: 1 })
    //         .trigger('mouseup', { force: true });
            
    // })

  })  
  
})