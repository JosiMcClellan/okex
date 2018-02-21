describe('Hello World', function () {
  it('When I visit the main page, I am greeted as the world', function(){
    cy.visit('/')
    cy.contains('Hello, World!');
  });
});
