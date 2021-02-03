describe('Slide interaction', () => {

  beforeEach(() => {
    window.localStorage.setItem("miral_isFirstUse", true);
    cy.visit('/');
  })

  context("creating slides", () => {

    it('shows the slide navigator when creating slides with disabled buttons', () => {
        cy.get('.toolbar_more').click();
        cy.get('.toolbar_slide').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('g rect').should('have.class', 'elementSelectedByUser');
        cy.get('.slideList_controls').should('be.visible');
        cy.get('.slideList_controls .dropDown').contains('Slide 1 of 1');
        cy.get('.slideList_controls .forward').should('have.class', 'buttonDisabled');
        cy.get('.slideList_controls .backward').should('have.class', 'buttonDisabled');
    })

    it('updates the slide numbers when creating new slides', () => {
        cy.get('.toolbar_more').click();
        cy.get('.toolbar_slide').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('g rect').should('have.class', 'elementSelectedByUser');
        cy.get('.slideList_controls').should('be.visible');
        cy.get('.slideList_controls .dropDown').contains('Slide 1 of 1');
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.get('.slideList_controls .dropDown').contains('Slide 1 of 4');
        cy.get('.slideList_controls .forward').should('not.have.class', 'buttonDisabled');
    })

    it('shows the slide list in the dropdown', () => {
        cy.get('.toolbar_more').click();
        cy.get('.toolbar_slide').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('g rect').should('have.class', 'elementSelectedByUser');
        cy.get('.slideList_controls').should('be.visible');
        cy.get('.slideList_controls .dropDown').contains('Slide 1 of 1');
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.get('.slideList_controls .dropDown').click();
        cy.get('.slideList').should('have.class', 'dropDown_open');
        cy.get('.slideList .slideList_name').should('have.length', 4);
    })

  })

  context("navigating slides", () => {
    it('moves to the correct slide and zoom level when clicking next', () => {
        cy.get('.toolbar_more').click();
        cy.get('.toolbar_slide').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('g rect').should('have.class', 'elementSelectedByUser');
        cy.get('.slideList_controls').should('be.visible');
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.get('.slideList_controls .forward').click();
        cy.get('.slideList_controls .dropDown').contains('Slide 2 of 2');
        cy.get('#board').should('have.attr', 'viewBox', '24905.726320836868 450.1034877259674 34000 22440');
    })

    it('moves to the correct slide and zoom level when clicking back', () => {
        cy.get('.toolbar_more').click();
        cy.get('.toolbar_slide').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('g rect').should('have.class', 'elementSelectedByUser');
        cy.get('.slideList_controls').should('be.visible');
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.get('.slideList_controls .forward').click();
        cy.get('.slideList_controls .dropDown').contains('Slide 2 of 2');
        cy.get('#board').should('have.attr', 'viewBox', '24905.726320836868 450.1034877259674 34000 22440');
        cy.get('.slideList_controls .forward').should('have.class', 'buttonDisabled');
        cy.get('.slideList_controls .backward').click();
        cy.get('.slideList_controls .dropDown').contains('Slide 1 of 2');
        cy.get('#board').should('have.attr', 'viewBox', '494.3873486277201 449.99997620064585 34000 22440');
        cy.get('.slideList_controls .forward').should('not.have.class', 'buttonDisabled');
        cy.get('.slideList_controls .backward').should('have.class', 'buttonDisabled');
    })

    it('moves to the correct slide and zoom level when clicking slide in list', () => {
        cy.get('.toolbar_more').click();
        cy.get('.toolbar_slide').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('g rect').should('have.class', 'elementSelectedByUser');
        cy.get('.slideList_controls').should('be.visible');
        cy.get('.slideList_controls .dropDown').contains('Slide 1 of 1');
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.get('.slideList_controls .dropDown').click();
        cy.get('.slideList .slideList_name').eq(1).click();
        cy.get('#board').should('have.attr', 'viewBox', '24905.726320836868 450.1034877259674 34000 22440');
        cy.get('.slideList').should('not.have.class', 'dropDown_open');
    })

  })
  
})