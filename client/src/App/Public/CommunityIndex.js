import React from 'react';
import GridList from 'material-ui/GridList';
import CommunitiesFetcher from '../../fetchers/CommunitiesFetcher';
import Preview from './Community/Preview';

class CommunityIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { communities: null };
  }

  componentDidMount() {
    new CommunitiesFetcher().index()
      .then(communities => this.setState({ communities }));
  }

  render() {
    const { communities } = this.state;
    if (!communities) return 'Loading';
    return (
      <GridList cols={3} spacing={2}>
        {communities.map(Preview)}
      </GridList>
    );
  }
}

export default CommunityIndex;
