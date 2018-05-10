describe('When I view any page', function() {
  context('as a visitor, I see', function() {
    it(`
      no account dropdown
      a header with:
        a link back to the homepage.
        a link to the community index.
        a login button.
      a footer with:
        links to "about" and "terms" pages
        site copyright info.
    `, function() {
      cy.visit('/')
      cy.dataGet('account-menu-open').should('not.exist');

      cy.get('header').within(function() {
        cy.get('[href="/"]');
        cy.get('[href="/c"]');
        cy.dataGet('login');
      });
      cy.get('footer').within(function() {
        cy.get('[href="/about"]');
        cy.get('[href="/terms"]');
        cy.contains('©2018 Josi McClellan')
      });
    });
  });

  context('as a User, I see', function() {
    it(`
      no login button.
      an account dropdown containing
        a link to my account settings.
        a link to my profiles.
        a button to logout.
    `, function() {
      cy.login();
      cy.visit('/');
      cy.dataGet('login').should('not.exist');

      cy.get('#account-menu').should('not.exist');
      cy.dataGet('account-menu-open').click();
      cy.get('#account-menu').within(function() {
        cy.get('[href="/settings"]');
        cy.get('[href="/profiles"]');
        cy.dataGet('logout');
      });
    });
  });
});
