describe('Hub', () => {

  beforeEach(() => {
    window.localStorage.setItem("miralFile_test123", `{"elements":{"OSXQyXW4c":{"id":"OSXQyXW4c","type":"shape","styles":{"x":28531.0546875,"y":13763.8671875,"width":12000,"height":6000,"fillOpacity":0,"fill":"#ffffff","stroke":"#000000","strokeOpacity":1,"strokeWidth":100,"strokeDasharray":"0"},"fontStyle":{"fontSize":1200,"fontFamily":"sans-serif","fontWeight":"normal","fontStyle":"normal","textDecorationLine":"","color":"#080808","textAlign":"center","alignItems":"center"},"text":"Hello this is a test","initialZoomLevel":50,"link":"","hidden":false,"groups":[],"locked":false,"comments":[],"rotation":0,"flipped":false,"shapeType":0,"unScaledFontSize":1200,"padding":400}},"elementState":{"OSXQyXW4c":{"selected":false}},"boardName":"new-board-11062021","zoomLevel":50,"offsetX":0,"offsetY":0}`);
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

  context("home tab", () => {

    beforeEach(() => {
      
    })

    it('opens the sandbox when you click the trigger', () => {
        cy.get('.tutorialTriggerContent').click({force : true});
        cy.get('.hub').should('not.be.visible');
    })

    it('closes when you click new board', () => {
      cy.contains('new board').click({force : true});
      cy.get('.hub').should('not.be.visible');
    })

    it('has one saved file visible', () => {
      cy.contains('test123').scrollIntoView().should('be.visible');
    })

    it('has loads the locally saved file when clicked', () => {
      cy.contains('test123').click({force : true});
      cy.get('.hub').should('not.be.visible');
      cy.get("text").eq(0).should('contain', 'Hello this is a test');
    })

  })
  
})