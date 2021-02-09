describe('MultiUser', () => {

  beforeEach(() => {
    window.localStorage.setItem("miral_isFirstUse", true);
    cy.visit('/');
  })

  context("sharing a board", () => {
    it('opens the share menu', () => {
        cy.get('.iconButton.share').click();
        cy.get('.share_menu').should('be.visible');
        
    })
    it('changes the icon color when shared', () => {
        cy.get('.iconButton.share').click();
        cy.get('#share_menu_input_userName').type('simon123');
        cy.get('#share_menu_input_initials').type('skt');
        cy.get('#share_menu_input_shareNow').click();
        cy.get('.iconButton.share').should('have.class', 'pulse');
        cy.contains("Sharing session active!").should("be.visible");
    })
    it('shows a badge & cursor when another user joins', () => {
        cy.get('.iconButton.share').click();
        cy.get('#share_menu_input_userName').type('simon123');
        cy.get('#share_menu_input_initials').type('skt');
        cy.get('#share_menu_input_shareNow').click();
        cy.get('.iconButton.share').click();
        cy.window().then(function(win){
            win.emitLocalEvent = function(event/*, arg1, arg2, etc.*/) {
                const socket = win.workshoppr.socket;
                    if(socket._callbacks) { 
                        var args = [].slice.call(arguments, 1),
                            callbacks = socket._callbacks['$' + event];
                        if (callbacks) {
                            callbacks = callbacks.slice(0);
                            for (var i = 0, len = callbacks.length; i < len; ++i)
                                callbacks[i].apply(socket, args);
                        }
                    }
            }
            win.emitLocalEvent("userJoin", {
                id : "2340982u34",
                color : "red",
                name : "simon",
                initials : "sks",
                pointerPosition : {x:800, y :800}
            });
            cy.get(".multiUser_UserDockAvatar").eq(0).should('contain', 'simon');
            cy.get(".multiUser_UserCursorWrapper").eq(0).should('contain', 'sks');
            cy.get(".multiUser_UserCursorWrapper").wait(900).eq(0)
                .then($target => {
                    let coords = $target[0].getBoundingClientRect();
                    expect(coords.x).to.equal(16);
                    expect(coords.y).to.equal(16);
                })

        })
    })

    it('shows a updates the cursor when it recieves new co-ordinates', () => {
        cy.get('.iconButton.share').click();
        cy.get('#share_menu_input_userName').type('simon123');
        cy.get('#share_menu_input_initials').type('skt');
        cy.get('#share_menu_input_shareNow').click();
        cy.get('.iconButton.share').click();
        cy.window().then(function(win){
            const boardIDRegex = /h=(.+?)\&+/g,
            hash = win.location.hash,
            boardID = boardIDRegex.exec(hash);

            win.emitLocalEvent = function(event/*, arg1, arg2, etc.*/) {
                const socket = win.workshoppr.socket;
                    if(socket._callbacks) { 
                        var args = [].slice.call(arguments, 1),
                            callbacks = socket._callbacks['$' + event];
                        if (callbacks) {
                            callbacks = callbacks.slice(0);
                            for (var i = 0, len = callbacks.length; i < len; ++i)
                                callbacks[i].apply(socket, args);
                        }
                    }
            }
            win.emitLocalEvent("userJoin", {
                id : "2340982u34",
                color : "red",
                name : "simon",
                initials : "sks",
                pointerPosition : {x:800, y :800}
            });

            cy.get(".multiUser_UserCursorWrapper").wait(900).eq(0)
            .then($target => {
                let coords = $target[0].getBoundingClientRect();
                expect(coords.x).to.equal(16);
                expect(coords.y).to.equal(16);
            })

            setTimeout(() => {
                win.emitLocalEvent("updatePointer", {
                    boardID,
                    id : "2340982u34",
                    pointerPosition : {x:8000, y :8000}
                });
            }, 1000);

            cy.get(".multiUser_UserCursorWrapper").wait(1800).eq(0)
            .then($target => {
                let coords = $target[0].getBoundingClientRect();
                expect(coords.x).to.equal(160);
                expect(coords.y).to.equal(160);
            })
        })
    })

  })
  
})