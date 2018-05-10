describe('When I visit the community show page', function() {
  context('as a visitor,', function() {
    it(`
      I see the community preview with title and description
      I see a login prompt and no join button
    `, function() {
      cy.visit('/c/fresh-community');
      cy.dataGet('community-header').within(function() {
        cy.contains('Fresh Community')
        cy.contains('member account has not joined yet')
      });
      cy.dataGet('community-login-prompt')
      cy.get('main button').should('not.exist')
    });
  });

  context('as a user', function() {
    describe(`
      I see the community preview
      I see a button to join and no login prompt
        and when I press the button I see a popup form
          with a "handle" field
          and when I fill in and submit the form
            I'm on my profile tab of the members area
          and when I fill in and cancel the form
            I'm on the same page and the popup is gone
    `, function() {
      beforeEach(function() {
        cy.login();
        cy.visit('/c/fresh-community');
        cy.dataGet('community-header');
        cy.dataGet('login-prompt').should('not.exist')
      });
      it('submits with mouse flow', function() {
        cy.get('main button').click()
        cy.get('textarea:not([aria-hidden])').type('A. Clever Handle')
        cy.get('[aria-label="submit"]').click()
        cy.get('form').should('not.exist')
        cy.get('button[role="tab"][aria-selected="true"]').contains('Profile')
        cy.contains('A. Clever Handle')
      });
      it(`cancels with mouse flow`, function() {
        cy.get('main button').click()
        cy.get('textarea:not([aria-hidden])').type('Nev R. Mind')
        cy.get('[aria-label="cancel"]').click()
        cy.get('form').should('not.exist')
        cy.get('button[role="tab"]').should('not.exist')
      });
      it('submits with keyboard flow', function() {
        cy.get('main button').type('{enter}')
        cy.get('textarea:not([aria-hidden])').type('A. Clever Handle{enter}')
        cy.get('form').should('not.exist')
        cy.get('button[role="tab"][aria-selected="true"]').contains('Profile')
        cy.contains('A. Clever Handle')
      })
      it('cancels with keyboard flow', function() {
        cy.get('main button').type('{enter}')
        cy.get('textarea:not([aria-hidden])').type('Nev R. Mind{esc}')
        cy.get('form').should('not.exist')
        cy.get('button[role="tab"]').should('not.exist')
      });
    });
  });

});
