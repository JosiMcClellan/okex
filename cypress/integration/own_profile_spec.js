describe('As a member, when I visit my profile tab in a community', function() {

  it(`
    I see the page title
    I see the profile prompts for that community
      where answered prompts show the answer
      where unanswered prompts show no answer
      and when I select an unanswered prompt
        I see a blank text field,
        and when I fill it in and submit, I see the answer
      and when I select an answered prompt
        I see a text field with the old answer,
        and when I alter the answer and submit, I see the updated answer
  `, function() {

    cy.visitMemberTab('Profile')
    cy.contains('Profile for Cool Handle Uke')

    cy.dataGet('field-1').within(function() {
      cy.dataGet('profile-prompt').contains('fresh profile prompt');
      cy.dataGet('closed-profile-response').should('not.exist');
      cy.dataGet('open-profile-response').should('not.exist');
      cy.root().click();
      cy.dataGet('open-profile-response');
      cy.get('textarea').not('[aria-hidden]').type('the new answer{enter}');
      cy.dataGet('open-profile-response').should('not.exist');
      cy.dataGet('closed-profile-response').contains('the new answer');
    });

    cy.dataGet('field-2').within(function() {
      cy.dataGet('profile-prompt').contains('answered profile prompt');
      cy.dataGet('closed-profile-response').contains('the old answer');
      cy.dataGet('open-profile-response').should('not.exist');
      cy.root().click();
      cy.dataGet('open-profile-response');
      cy.get('textarea').not('[aria-hidden]').type(' was updated{enter}');
      cy.dataGet('open-profile-response').should('not.exist');
      cy.dataGet('closed-profile-response').contains('the old answer was updated');
    });

  });
});
