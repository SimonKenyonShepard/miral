describe('Hub', () => {

  beforeEach(() => {
    window.localStorage.setItem("miralFile_test123", `{"elements":{"OSXQyXW4c":{"id":"OSXQyXW4c","type":"shape","styles":{"x":28531.0546875,"y":13763.8671875,"width":12000,"height":6000,"fillOpacity":0,"fill":"#ffffff","stroke":"#000000","strokeOpacity":1,"strokeWidth":100,"strokeDasharray":"0"},"fontStyle":{"fontSize":1200,"fontFamily":"sans-serif","fontWeight":"normal","fontStyle":"normal","textDecorationLine":"","color":"#080808","textAlign":"center","alignItems":"center"},"text":"Hello this is a test","initialZoomLevel":50,"link":"","hidden":false,"groups":[],"locked":false,"comments":[],"rotation":0,"flipped":false,"shapeType":0,"unScaledFontSize":1200,"padding":400}},"elementState":{"OSXQyXW4c":{"selected":false}},"boardName":"new-board-11062021","zoomLevel":50,"offsetX":0,"offsetY":0}`);
    cy.visit('/');
    cy.get('.hubBackground').click({force : true});
    cy.get('.hub').should('not.be.visible');
  })

  context("menu behaviour", () => {
    
    it('saves a file to the browser', () => {
        cy.get('.boardName').click();
        cy.get('.boardName').type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}testFile');
        cy.get('#board').click(10, 10);
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('#board').dblclick(300, 300);
        cy.get("#textEditor").type('Hello this is a test shape');
        cy.get('#board').click(10, 10);
        cy.get('.burgerMenu').click();
        cy.contains("Save to Browser").should('be.visible');
        cy.contains("Save to Browser").click();
        cy.wait(500).window().then(function(win){

          expect(win.localStorage.getItem("miralFile_testFile")).to.contain("Hello this is a test shape");

      })
    })

    it('shows the saved browser files and loads them', () => {
        cy.get('.burgerMenu').click();
        cy.contains("Load from Browser").should('be.visible');
        cy.contains("Load from Browser").click();
        cy.contains("test123").should("be.visible");
        cy.contains("test123").click();
        cy.get("text").eq(0).should('contain', 'Hello this is a test');
    })

  })
  
})