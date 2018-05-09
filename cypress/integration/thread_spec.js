describe('As a member, when I visit a specific thread page', function() {
  it(`
    I see the thread topic
    I see all the posts, showing text and date posted, ascending by date posted
    I see a button for to create a new post, and when I click it
      I see a form with, and when I fill out the text and submit it
        I see the new post at the top of the thread
        and when I go back to the community forum
          I see the thread has become the most recently active
  `, function() {
    cy.visitMemberTab('Forum');
    cy.contains('distantly active thread').click();
    cy.url().should('contain', 'c/joined-community/thread/'); // don't know id
    cy.contains('Thread: distantly active thread');

    cy.dataGet('grid-button').then(function([older, newer]) {
      cy.wrap(older).within(function() {
        cy.contains('distant post');
        cy.contains('posted Jan  1, 2000');
      });
      cy.wrap(newer).within(function() {
        cy.contains('recent post');
        cy.contains('posted Jan  2, 2000');
      });
    });

    cy.contains(/new post/i).click();
    cy.get('textarea').not('[aria-hidden]').type('brand new post{enter}');
    cy.contains('brand new post').not(':hidden');
    cy.dataGet('grid-button').last().contains('brand new post');

    cy.go('back');
    cy.dataGet('grid-button').first().contains('distantly active thread');
  });
});
