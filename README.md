# OKX <small>___Stack Exchange Network meets OkCupid... a perfect match!___
</small> [![Build Status](https://travis-ci.org/JosiMcClellan/okex.svg?branch=master)](https://travis-ci.org/JosiMcClellan/okex)

## Steps
#### Setup
System Expectations: Git, Node, Ruby, Yarn, Rake

to install eveything:
```
git clone git@github.com:JosiMcClellan/okex.git
cd okex
yarn setup
```
then you can visit localhost:3000.  Things might break without my API keys in your environment, though.

#### Testing
My very next task is make real Cypress work (locally and on Travis)  Until then, there are only request specs for the server.  After setup, run them with `rake` (or `rake test` or `rspec`, they're all the same).

You can also at least lint from the client dir with `yarn pretest`.

## Description
#### The Problem
Human are complex; we need many kinds of interaction, and while matchmaking sites are powerful, they're really only used for the romantic stuff.

#### The Solution
Activism, support, collaboration, discussion, and many other categories could benefit from that same tool.  Letting self-moderating "hubs" (like communities of Stack Exchange) generate their own match criteria and design will allow a big network with minimal content administration.

#### The Technology
- __Client:__ React, React Router, Material UI
- __Own API:__ Rails
- __3rd-party API:__ SendGrid
- __Authentication:__ Google
- __End-to-end tests:__ Cypress
- __Continuous Integration__: Travis
- __Hosting:__ Heroku

#### The School Assignment
[pretty much whatever](http://backend.turing.io/module3/projects/self_directed_project)

## Misc
Ignore the naming mismatch on the repo. `OKX` is the real name, but the URL with `okex` has already been shared too much.
