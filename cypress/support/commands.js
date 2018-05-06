Cypress.Commands.add('seed', function(email, password) {
  cy.exec('RAILS_ENV=test rake db:seed');
});

Cypress.Commands.add('dataGet', { prevSubject: 'optional' }, function(subject, name) {
  (subject || cy).get(`[data-cy=${name}]`);
});

Cypress.Commands.add('login', function() {
  localStorage.setItem('account', JSON.stringify({
    email: 'member@okx.herokuapp.com',
    token: 'legitMember',
  }))
})
