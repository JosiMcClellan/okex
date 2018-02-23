describe('Hello World', function () {
  it(
  `When I visit the hello world page,
    I am greeted as the world`,
  function(){
    cy.visit('/hello_world')
    cy.contains('Hello, World!');
  });
});
