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
    it('creates a shape of the correct size when dragged', () => {

        cy.get('.toolbar_shape').click();

        cy.then(() => {
            return dragMouse(cy.get('#interActionManager'), {x:300, y:300}, {x:400, y:400}, 30);
        })

        cy.get('g rect').eq(0).should('have.attr', 'width', 9900);

        
    })
    

  })  
  
})