

describe('Board Controls', () => {

  beforeEach(() => {
    window.localStorage.setItem("miral_isFirstUse", true);
    cy.visit('/');
  })

  context("changing board name", () => {

    it('changes the browser title with the new name', () => {
        cy.get('.boardName').click();
        cy.get('.boardName').clear().type('new board name');
        cy.get('#board').click(10, 10);
        cy.wait(100).window().then(function(win){
          expect(win.document.title).to.contain("Workshoppr.com - new board name");
        });
    })

  })
  
   
  
})