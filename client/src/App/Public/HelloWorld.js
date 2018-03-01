import React from 'react';
import Typography from 'material-ui/Typography';
import fetchOKX from '../../fetchOKX';

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello: null };
  }

  componentDidMount() {
    fetchOKX('/hello_world')
      .then(({ hello }) => this.setState({ hello }));
  }

  style = {
    fontFamily: 'Papyrus',
    padding: '20vh',
    fontSize: '20vh',
  }

  render() {
    const { hello } = this.state;
    if (!hello) return null;
    return (
      <Typography style={this.style}>
        Hello, {hello}!
      </Typography>
    );
  }
}

export default HelloWorld;
