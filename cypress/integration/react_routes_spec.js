describe('Client/API Routes', function() {
  it(
  `When I visit a bad non-API path,
    I receive the react app.`,
  function() {
    cy.visit('/not/even/a/real/route')
    cy.contains("We're sorry, we can't find what you're looking for.")
  });

  it(
  `When I request a bad API path,
    I receive a JSON error message`,
  function() {
    cy.request({
      url: '/api/not/even/a/real/route',
      failOnStatusCode: false,
    }).then(res => expect(res.body).to.have.property(
      'error', 'no route matches, check your URL'
    ))
  });

});
