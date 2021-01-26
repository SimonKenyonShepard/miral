function dragMouse(element, from, to, speed){
    const steps = to.x - from.x;
    for(let i = 0; i < steps; i++) {
        const clientX = from.x+i,
              clientY = from.y+i;
        
        if(i === 0) {
            element.trigger('pointerdown', { 
                eventConstructor: 'PointerEvent',
                bubbles: true,
                cancelable: true,
                buttons: 1,
                clientX, 
                clientY, 
                screenX: clientX, 
                screenY: clientY,
            });
        }

        (function(element, clientX, clientY, incrementDelay) {
            setTimeout(() => {
                element.trigger('pointermove', { 
                    eventConstructor: 'PointerEvent',
                    bubbles: true,
                    cancelable: true,
                    buttons: 1,
                    clientX,
                    clientY,
                    screenX: clientX,
                    screenY: clientY
                });
                console.log("test mouse move");
            }, incrementDelay);
        }.bind(this)(element, clientX, clientY, speed*(i+1)));

        if(i === steps-1) {
            (function(element, clientX, clientY, incrementDelay) {
                return new Cypress.Promise((resolve, reject) => {
                    setTimeout(() => {
                        element.trigger('pointerup', {
                            eventConstructor: 'PointerEvent',
                            bubbles: true,
                            cancelable: true,
                            buttons: 1,
                            clientX,
                            clientY,
                            screenX: clientX,
                            screenY: clientY,
                            force: true 
                        });
                        console.log("test mouse move");
                        resolve('foo');
                    }, incrementDelay);
                });
            }.bind(this)(element, clientX, clientY, speed*(i+2)));
        }

    }
};

// describe('Panning and zooming', () => {

//     beforeEach(() => {
//       window.localStorage.setItem("miral_isFirstUse", true);
//       cy.visit('/');
//     })
//     context("panning the board", () => {
//       it('pans left, right, up and down when dragged', () => {
//           cy.get('.toolbar_shape').click();
//           cy.get('#drawCanvas').should('be.visible');
//       })
//       it('zooms in and out when mouse wheel is scrolled', () => {
//           cy.get('.toolbar_shape').click();
//           cy.get('#drawCanvas').should('be.visible');
//       })
//       it('pans left, right, up and down when touchpad is used', () => {
//           cy.get('.toolbar_shape').click();
//           cy.get('#drawCanvas').should('be.visible');
//       })
//       it('zooms in and out when pinch zoom is used', () => {
//           cy.get('.toolbar_shape').click();
//           cy.get('#drawCanvas').should('be.visible');
//       })
  
//     })  
    
// })

describe('Element selection', () => {

  beforeEach(() => {
    window.localStorage.setItem("miral_isFirstUse", true);
    cy.visit('/');
  })
  context("selecting elements", () => {

    it('deselects an elements when canvas clicked', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('g rect').should('have.class', 'elementSelectedByUser');
        cy.get('#board').click(10, 10);
        cy.get('g rect').should('not.have.class', 'elementSelectedByUser');

    })

    it('selects an element when clicked', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('#board').click(10, 10);
        cy.get('#board').click(300, 300);
        cy.get('g rect').should('have.class', 'elementSelectedByUser');

    })

    it('selects a different element when clicked and deselects the other element', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('#board').click(10, 10);
        cy.get('.toolbar_shapeRect').eq(0).click();
        cy.get('#drawCanvas').click(600, 600);
        cy.get('#board').click(10, 10);
        cy.get('#board').click(300, 300);
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('not.have.class', 'elementSelectedByUser');
        cy.get('#board').click(600, 600);
        cy.get('g rect').eq(0).should('not.have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
    })

    it('selects multiple elements when clicked with the control key pressed', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('#board').click(10, 10);
        cy.get('.toolbar_shapeRect').eq(0).click();
        cy.get('#drawCanvas').click(600, 600);
        cy.get('#board').click(10, 10);
        cy.get('#board').click(300, 300);
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('not.have.class', 'elementSelectedByUser');
        cy.get('#board').click(600, 600, {metaKey : true});
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
    })

    it('deselects element when multiple elements are selected and and element is clicked again with the control key pressed', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('#board').click(10, 10);
        cy.get('.toolbar_shapeRect').eq(0).click();
        cy.get('#drawCanvas').click(600, 600);
        cy.get('#board').click(10, 10);
        cy.get('#board').click(300, 300);
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('not.have.class', 'elementSelectedByUser');
        cy.get('#board').click(600, 600, {metaKey : true});
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
        cy.get('#board').click(600, 600, {metaKey : true});
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('not.have.class', 'elementSelectedByUser');
    })

    it('deselects multiple previous elements when clicked with the control key not presssed', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('#board').click(10, 10);
        cy.get('.toolbar_shapeRect').eq(0).click();
        cy.get('#drawCanvas').click(600, 600);
        cy.get('#board').click(10, 10);
        cy.get('#board').click(300, 300);
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('not.have.class', 'elementSelectedByUser');
        cy.get('#board').click(600, 600, {metaKey : true});
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
        cy.get('#board').click(300, 300);
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('not.have.class', 'elementSelectedByUser');
    })

    it('selects multiple elements when a grouped element is clicked', () => {
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
        cy.get('#board').click(300, 300);
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
    })

  })
  
})