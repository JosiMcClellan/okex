describe('When I visit the community show page', function() {
  describe('as a visitor,', function() {
    it(`
      I see the community preview, including
        title
        description
        date founded
        date active
        number of profiles
        a button to join the community
      then I see a login prompt and no join button
    `, function() {
      cy.visit('/c/community1');
      cy.dataGet('community-header')
      cy.contains('Community1')
      cy.contains('the first community')
      // cy.contains('TK date founded')
      // cy.contains('TK date active')
      // cy.contains('TK number of profiles')
      cy.dataGet('community-login-prompt')
      cy.get('main button').should('not.exist')
    });
  });

  describe(`
    as a user, I see the community preview
      with a button to join and no login prompt
      and when I click the button
        I see a popup form
          with a "handle field" which has focus
          and when I fill in and submit the form
            I'm on the profile tab of the members area
  `, function() {
    beforeEach(function() {
      cy.login();
      cy.visit('/c/community1');
    })
    // it('submits with mouse flow', function() {
    //   cy.dataGet('community-header')
    //   cy.dataGet('login-prompt').should('not.exist')
    //   cy.get('main button').click()
    //   cy.get('textarea:focus').type('A. Clever Handle')
    //   cy.get('[aria-label="submit"]').click()
    //   cy.get('button[role="tab"][aria-selected="true"]').contains('Profile')
    //   cy.contains('A. Clever Handle')
    // });

    it(`cancels with mouse flow`, function() {
      cy.get('main button').click()
      cy.get('textarea:focus').type('Nev R. Mind')
      cy.get('[aria-label="cancel"]').click()
      cy.get('form').should('not.exist')
      cy.get('button[role="tab"]').should('not.exist')
    });

    it('submits with keyboard flow', function() {
      cy.get('main button').type('{enter}')
      cy.get('textarea:focus').type('A. Clever Handle{enter}')
      cy.get('form').should('not.exist')
      cy.get('button[role="tab"]')
      cy.contains('A. Clever Handle')
    })

    it('cancels with keyboard flow', function() {
      cy.get('main button').type('{enter}')
      cy.get('textarea:focus').type('B. LeMile Ast{esc}')
      cy.get('form').should('not.exist')
      cy.get('button[role="tab"]').should('not.exist')
    });
  });

});
