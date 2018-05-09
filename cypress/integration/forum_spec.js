describe('As a member, when I visit the forum tab', function() {
  it(`
    I see the page title
    I see a list of threads sorted by date last active
      and each thread is a link to that thread's own page
      and each thread shows the
        topic,
        author,
        date started,
        date last active,
        number of posts

    I see a "new thread" button
      and when I click the button, I see a form appear
        and fill in and submit the form, I see a new thread at the top of the list
  `, function() {

    cy.visitMemberTab('Forum');
    cy.contains('All Threads');

    cy.dataGet('grid-button').then(function([newer, older]) {
      cy.wrap(newer).within(function() {
        cy.contains('recently active thread');
        cy.contains('0 posts');
        cy.contains('started Jan  1, 2000');
        cy.contains('active Jan  4, 2000');
      });
      cy.wrap(older).within(function() {
        cy.contains('distantly active thread');
        cy.contains('2 posts');
        cy.contains('started Jan  2, 2000');
        cy.contains('active Jan  3, 2000');
      });
    });

    cy.contains(/new thread/i).click();
    cy.get('textarea').not('[aria-hidden]').type('brand new thread{enter}');
    cy.contains('brand new thread');
    cy.dataGet('grid-button').first().contains('brand new thread');

  });
});
