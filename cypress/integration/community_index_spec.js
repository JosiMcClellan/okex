describe('when I visit the community index page', function() {
  it(`
    I see cards for each community that are links to the community
      and in each card I see title, description, and image
  `, function() {
    cy.visit('/c');
    cy.get('[href="c/fresh-community"]');
    cy.get('[href="c/joined-community"]').within(function() {
      cy.contains('Joined Community');
      cy.contains('member account has joined already');
      cy.get('img[src="/communities/queerRights.png"][alt="Joined Community"]');
    });
  });
})
