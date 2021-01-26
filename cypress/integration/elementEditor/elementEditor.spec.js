describe('Element Editor', () => {

    beforeEach(() => {
        window.localStorage.setItem("miral_isFirstUse", true);
        cy.visit('/');
    })

    context("editing multiple elements", () => {

        it('shows a different toolbar when multiple elements are selected', () => {
            cy.get('.toolbar_shape').click();
            cy.get('#drawCanvas').click(300, 300);
            cy.get('#board').click(10, 10);
            cy.get('.toolbar_shapeRect').eq(0).click();
            cy.get('#drawCanvas').click(600, 600);
            cy.get('#board').click(10, 10);
            cy.get('#board').click(300, 300);
            cy.get('#board').click(600, 600, {metaKey : true});
            cy.get('[title="Bring to front"]').should('be.visible');
            cy.get('[title="Lock this element from changes"]').should('be.visible');
            cy.get('[title="Group these elements"]').should('be.visible');
            cy.get('[title="Delete this element"]').should('be.visible');
            cy.get('[title="More options"]').should('be.visible');
        })
        it('shows the color picker when multiple elements are selected and they are the same type', () => {
            cy.get('.toolbar_shape').click();
            cy.get('#drawCanvas').click(300, 300);
            cy.get('#board').click(10, 10);
            cy.get('.toolbar_shapeRect').eq(0).click();
            cy.get('#drawCanvas').click(600, 600);
            cy.get('#board').click(10, 10);
            cy.get('#board').click(300, 300);
            cy.get('#board').click(600, 600, {metaKey : true});
            cy.get('[title="Change color"]').should('be.visible');
        })

    })

    context("grouping multiple elements", () => {

        it('groups multiple elements when the group tool is used', () => {
            cy.get('.toolbar_shape').click();
            cy.get('#drawCanvas').click(300, 300);
            cy.get('#board').click(10, 10);
            cy.get('.toolbar_shapeRect').eq(0).click();
            cy.get('#drawCanvas').click(600, 600);
            cy.get('#board').click(10, 10);
            cy.get('#board').click(300, 300);
            cy.get('#board').click(600, 600, {metaKey : true});
            cy.get('[title="Group these elements"]').click();
            cy.get('[title="Group these elements"]').should("not.exist");
            cy.get('[title="Ungroup these elements"]').should("be.visible");

        })
        it('groups multiple elements and groups when the group tool is used', () => {
            cy.get('.toolbar_shape').click();
            cy.get('#drawCanvas').click(300, 300);
            cy.get('#board').click(10, 10);
            cy.get('.toolbar_shapeRect').eq(0).click();
            cy.get('#drawCanvas').click(600, 600);
            cy.get('#board').click(10, 10);
            cy.get('#board').click(300, 300);
            cy.get('#board').click(600, 600, {metaKey : true});
            cy.get('[title="Group these elements"]').click();
            cy.get('#board').click(10, 10);
            cy.get('.toolbar_shapeRect').eq(0).click();
            cy.get('#drawCanvas').click(400, 200);
            cy.get('#board').click(10, 10);
            cy.get('#board').click(300, 300);
            cy.get('[title="Ungroup these elements"]').should("be.visible");
            cy.get('#board').click(400, 200, {metaKey : true});
            cy.get('[title="Group these elements"]').should("be.visible");
            cy.get('[title="Group these elements"]').click();
            cy.get('[title="Ungroup these elements"]').should("be.visible");
            cy.get('#board').click(400, 200);
            cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
            cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
            cy.get('g rect').eq(2).should('have.class', 'elementSelectedByUser');

        })
        it('ungroups multiple elements when the ungroup tool is used', () => {
            cy.get('.toolbar_shape').click();
            cy.get('#drawCanvas').click(300, 300);
            cy.get('#board').click(10, 10);
            cy.get('.toolbar_shapeRect').eq(0).click();
            cy.get('#drawCanvas').click(600, 600);
            cy.get('#board').click(10, 10);
            cy.get('#board').click(300, 300);
            cy.get('#board').click(600, 600, {metaKey : true});
            cy.get('[title="Group these elements"]').click();
            cy.get('#board').click(10, 10);
            cy.get('.toolbar_shapeRect').eq(0).click();
            cy.get('#drawCanvas').click(400, 200);
            cy.get('#board').click(10, 10);
            cy.get('#board').click(300, 300);
            cy.get('[title="Ungroup these elements"]').should("be.visible");
            cy.get('#board').click(400, 200, {metaKey : true});
            cy.get('[title="Group these elements"]').should("be.visible");
            cy.get('[title="Group these elements"]').click();
            cy.get('[title="Ungroup these elements"]').should("be.visible");
            cy.get('#board').click(400, 200);
            cy.get('[title="Ungroup these elements"]').click();
            cy.get('#board').click(10, 10);
            cy.get('#board').click(300, 300);
            cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
            cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
            cy.get('g rect').eq(2).should('not.have.class', 'elementSelectedByUser');
        })

    })
  
})