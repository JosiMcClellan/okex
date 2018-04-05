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
      cy.dataGet('community-preview')
        .contains('Community1')
        .contains('the first community')
        .contains('TK date founded')
        .contains('TK date active')
        .contains('TK number of profiles')
      cy.dataGet('login-prompt')
      cy.dataGet('join-community').should('not.exist')
    });
  });

  describe('as a user', function() {
    it(`
      I see the community preview
        with a button to join and no login prompt
    `, function() {
      cy.dataGet('community-preview')
      cy.dataGet('join-community')
      cy.dataGet('login-prompt').should('not.exist')
    });
  });

});
