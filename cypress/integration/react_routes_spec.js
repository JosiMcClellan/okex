describe('Client/API Routes', function() {

  it(
  `When I visit any non-API path,
    I receive HTML`,
  function() {
    cy.visit('/not/even/a/real/route')
  });

  it(
  `When I request any API path,
    I receive JSON`,
  function() {
    cy.request('/api/not/even/a/real/route')
    .then(res => expect(res.body).to.be({ error: 'bad url' }));

})
  });
});
