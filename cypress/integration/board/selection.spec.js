function dragMouse(element, from, to, resolve){
    const maxDuration = 3000;
    const frameInterval = 30;
    const steps = maxDuration/frameInterval;
    const positionDelta = to.x - from.x;
    const increment = Math.ceil(positionDelta/steps);
    for(let i = 0; i < steps; i++) {
        const clientX = from.x+(i*increment),
              clientY = from.y+(i*increment);
        
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
                force: true
            });
        }

        (function(element, clientX, clientY, incrementDelay, isLastMovement, resolve) {
            setTimeout(() => {
                if(isLastMovement) {
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
                    setTimeout(() => {
                        resolve('foo');
                    }, 50);
                } else {
                    element.trigger('pointermove', { 
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
                }
            }, incrementDelay);
        }.bind(this)(element, clientX, clientY, frameInterval*(i+1), (i === (steps-1)), resolve));
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

describe('Element interaction', () => {

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

    it('selects only new group instance when grouped items duplicated', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('#board').click(10, 10);
        cy.get('.toolbar_shapeRect').eq(0).click();
        cy.get('#drawCanvas').click(600, 600);
        cy.get('#board').click(10, 10);
        cy.get('#board').click(300, 300);
        cy.get('#board').click(600, 600, {metaKey : true});
        cy.get('[title="Group these elements"]').click();
        cy.document().get("body").trigger("keydown", {
            eventConstructor: 'KeyboardEvent',
            ctrlKey: true,
            key : "d"
        });
        cy.get('#board').click(10, 10);
        cy.get('#board').click(800, 300);
        cy.get('g rect').eq(0).should('not.have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('not.have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(2).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(3).should('have.class', 'elementSelectedByUser');
    })

  })

  context("selecting elements", () => {
    it('brings an element to the top when it is dragged.', () => {
        cy.get('.toolbar_shape').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('#board').click(10, 10);
        cy.get('.toolbar_shapeRect').eq(0).click();
        cy.get('#drawCanvas').click(350, 350);
        cy.get('#board').click(10, 10);
        cy.get('#board').click(250, 250);
        cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
        cy.get('g rect').eq(1).should('not.have.class', 'elementSelectedByUser');
        cy.then(() => {
            return new Cypress.Promise((resolve, reject) => {
                dragMouse(
                    cy.get('g rect').eq(0),
                    {x:180, y:180},
                    {x:250, y:250},
                    resolve
                );
                
            })
        }).then(() => {
            cy.get('g rect').eq(0).should('not.have.class', 'elementSelectedByUser');
            cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
        })
    })

  })
  
})