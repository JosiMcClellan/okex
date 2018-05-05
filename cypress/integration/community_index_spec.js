describe('when I visit the community index page', function() {
  it(`
    I see cards for each community that are links to the community
      and in each card I see title, description, and image

  `, function() {
    cy.visit('/c');
    cy.get('[href="c/community1"]');
    cy.get('[href="c/community2"]').within(($link) => {
      console.warn($link)
      cy.contains('Community2')
      cy.contains('the second community')
      cy.get('img[src="/communities/pahlka.jpg"][alt="Community2"]')
    });
  });
})
