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
                        screenY: clientY
                    });
                }
            }, incrementDelay);
        }.bind(this)(element, clientX, clientY, frameInterval*(i+1), (i === (steps-1)), resolve));
    }
};

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
    it('autoselects the first emoji when the emoji tool is used', () => {
        cy.get('.toolbar_emoji').click();
        cy.get('#drawCanvas').click(300, 300);
        cy.get('text').contains('😀');
    })
    it('creates a shape of the correct size when dragged', () => {

        cy.get('.toolbar_shape').click();

        cy.then(() => {
            return new Cypress.Promise((resolve, reject) => {
                dragMouse(
                    cy.get('#interActionManager'),
                    {x:300, y:300},
                    {x:400, y:400},
                    resolve
                );
                
            })
        })

        cy.get('g rect').eq(0).should('have.attr', 'width', 4900);

        
    })
    

  })
  
    context("selecting shapes", () => {

        it('selects two shapes when a rectangle of the correct size is dragged', () => {

            cy.get('.toolbar_shape').click();
            cy.get('#drawCanvas').click(300, 300);
            cy.get('.toolbar_shapeRect').eq(0).click();
            cy.get('#drawCanvas').click(350, 350);
            cy.get('.toolbar_select').click();
    
            cy.then(() => {
                return new Cypress.Promise((resolve, reject) => {
                    dragMouse(
                        cy.get('#interActionManager'),
                        {x:150, y:200},
                        {x:500, y:500},
                        resolve
                    );
                    
                })
            }).then(() => {
                cy.get('g rect').eq(0).should('have.class', 'elementSelectedByUser');
                cy.get('g rect').eq(1).should('have.class', 'elementSelectedByUser');
            })
            
        })

    })
  
})