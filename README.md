# OKX <small>
</small> [![Build Status](https://travis-ci.org/JosiMcClellan/okex.svg?branch=master)](https://travis-ci.org/JosiMcClellan/okex)

## Summary
This ongoing, self-directed project is becoming a multi-tenant people matcher (think Stack Exchange Network meets OkCupid).

## Assignment
[pretty much whatever](http://backend.turing.io/module3/projects/self_directed_project)

## Tech
- __Server:__ Rails
- __Client:__ React, React Router, Material UI
- __3rd-party Integrations:__ Google (Oauth), SendGrid (emails)
- __Tests:__ Cypress (end-to-end), RSpec (request)
- __Continuous Integration__: Travis
- __Hosting:__ Heroku

## Tasks
<!-- Tools Required: Git, Node, Ruby, Yarn, Rake -->
### Setup
##### install everything
```
git clone git@github.com:JosiMcClellan/okex.git
cd okex
yarn setup
```
##### run locally
```
yarn start
```
##### make a local production build
```
yarn build
```
##### remove a local production build
```
yarn clobber
```
### Testing
##### request specs
```
rspec
```
##### end-to-end tests with interactive dashboard
```
yarn e2e
```
##### headless end-to-end tests (Travis basically does this)
```
# in one shell:
yarn start
# in another:
yarn test
```
