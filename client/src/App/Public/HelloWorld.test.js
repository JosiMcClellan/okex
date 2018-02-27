import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import HelloWorld from './HelloWorld';
import stub from '../../setupTests';

it('renders welcome message', function(done) {
  const promise = stub.fetch(200, { hello: 'World' });
  const hello = mount(<HelloWorld />);
  setImmediate(() => (
    promise.then(() => {
      expect(hello.state()).to.have.property('ready', true);
      hello.update();
    }).then(() => {
      expect(hello.contains(<p>Hello, World!</p>)).to.equal(true);
      done();
    })
  ));
});
