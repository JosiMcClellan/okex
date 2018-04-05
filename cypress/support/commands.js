Cypress.Commands.add('seed', function(email, password) {
  cy.exec('RAILS_ENV=test rake db:seed');
});

Cypress.Commands.add('dataGet', { prevSubject: 'optional' }, function(subject, name) {
  const receiver = subject || cy
  receiver.get(`[data-cy=${name}]`);
});


// .should('have.attr', 'href', '#/register')
