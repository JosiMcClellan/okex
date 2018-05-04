describe('When I view any page', function() {
  context('as a visitor', function() {
    it(`
      I see a header with:
        the brand, which is a link to the homepage.
        a link to the community index.
        a login button.
      I see a footer with:
        site copyright info.
        links to public info pages, including
          site terms.
          about the site.
    `, function() {
      cy.visit('/')
      cy.get('header a.brand[href="/"]');
      cy.get('header a[href="/c"]');
      cy.get('header img[alt="Sign In with Google"]')
      cy.get('footer a[href="/terms"]');
      cy.get('footer a[href="/about"]');
    });
  });

  // context('as a User', function() {
  //   it(`
  //     a header with
  //       no dropdown of login options.
  //       an account dropdown containing
  //         a link to my account settings.
  //         a link to my communities.
  //         a button to logout.
  //   `, function() {
  //     cy.signIn();
  //     cy.visit('/');
  //     cy.get('header button.account').click();
  //     cy.get('??? a[href="/settings"]');
  //     cy.get('??? a[href="/my-communities"]');
  //     cy.get('??? button.logout');
  //   });
  // });
});
