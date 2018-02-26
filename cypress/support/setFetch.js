// import GoogleLoginButton from '../client/src/App/Public/GoogleLoginButton'
//
// const stub = cy.stub()
//
// beforeEach(function stubFetch() {
//   cy.on('window:before:load', (win) => {
//     win.fetch = stub
//   })
// })
//
// Cypress.Commands.add("setFetch", (status, eventual) => {
//   const json = JSON.stringify(eventual);
//   const headers = { 'Content-type': 'application/json' };
//   const response = new Response(json, { status, headers });
//   const promise = Promise.resolve(response);
//   stub.returns(promise);
//   return promise;
// })
