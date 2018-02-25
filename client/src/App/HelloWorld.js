import React from 'react';
import fetchOKX from '../fetchOKX';

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello: null, ready: false };
  }

  componentDidMount() {
    fetchOKX('/hello_world')
      .then(({ hello }) => this.setState({ hello, ready: true }))
      .catch(console.log);
  }

  render() {
    const { ready, hello } = this.state;
    if (ready) return <p>Hello, {hello}!</p>;
    return <p>Loading</p>;
  }
}

export default HelloWorld;
