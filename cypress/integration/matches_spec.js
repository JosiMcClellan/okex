describe('As a member, when I view my matches', function() {
  it(`
    I see the page title
    I see my matches showing handle, avatar, and match percentages
      and the match is a link to their profile
      and the default order is descending average of percentages
    I see a selector for sort order
      and when I select a different sort order, I see the matches reorder
  `, function() {

    cy.visitMemberTab('Matches');
    cy.contains('Your Matches');

    cy.dataGet('match').then(function([first, second, third]) {
      cy.wrap(first).within(function() {
        cy.dataGet('handle').contains('Good Match');
        cy.get('img[src="better-match-avatar.jpg"]');
        cy.dataGet('my-percent').contains('82%');
        cy.dataGet('their-percent').contains('76%');
        cy.dataGet('joint-percent').contains('79%');
      });
      cy.wrap(second).within(function() {
        cy.dataGet('handle').contains('Unrequited Match');
        cy.get('img[src="worse-match-avatar.jpg"]');
        cy.dataGet('my-percent').contains('100%');
        cy.dataGet('their-percent').contains('0%');
        cy.dataGet('joint-percent').contains('50%');
      });
      cy.wrap(third).within(function() {
        cy.dataGet('handle').contains('Bad Match');
        cy.get('img[src="unrequited-match-avatar.jpg"]');
        cy.dataGet('my-percent').contains('17%');
        cy.dataGet('their-percent').contains('33%');
        cy.dataGet('joint-percent').contains('25%');
      });
    });

    cy.dataGet('sort-order').select('Their Percent')
    cy.dataGet('match').then(function([first, second, third]) {
      cy.wrap(first).contains('Good Match');
      cy.wrap(second).contains('Bad Match');
      cy.wrap(third).contains('Unrequited Match');
    });

    cy.dataGet('sort-order').select('My Percent')
    cy.dataGet('match').then(function([first, second, third]) {
      cy.wrap(first).contains('Unrequited Match');
      cy.wrap(second).contains('Good Match');
      cy.wrap(third).contains('Bad Match');
    });

    cy.dataGet('sort-order').select('Average Percent')
    cy.dataGet('match').then(function([first, second, third]) {
      cy.wrap(first).contains('Good Match');
      cy.wrap(second).contains('Unrequited Match');
      cy.wrap(third).contains('Bad Match');
    });
  });
});
