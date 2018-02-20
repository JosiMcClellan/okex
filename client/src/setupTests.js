import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { stub } from 'sinon';

configure({ adapter: new Adapter() });

beforeEach(() => {
  stub(window, 'fetch');
});

afterEach(() => {
  window.fetch.restore();
});

export default {
  fetch(status, obj) {
    const json = JSON.stringify(obj);
    const headers = { 'Content-type': 'application/json' };
    const response = new window.Response(json, { status, headers });
    const promise = Promise.resolve(response);
    window.fetch.returns(promise);
    return promise;
  },
};
