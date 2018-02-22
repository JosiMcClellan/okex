describe('Hello World', function() {
  it(
  `            *** Layout ***
      When I view any page as a visitor,
        I see a header with:
          the brand, which is a link to the homepage.
          a link to the community index.`,

    function() {
      cy.visit('/')
      cy.get('header a.brand[href="/"]')
      cy.get('header a[href="/c"]')
    }
  );
});
