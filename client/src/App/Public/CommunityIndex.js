import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import CommunitiesFetcher from '../../fetchers/CommunitiesFetcher';

class CommunityIndex extends React.Component {
  static Preview = preview => (
    <LinkContainer key={preview.slug} to={{ state: preview, pathname: `c/${preview.slug}` }}>
      <GridListTile>
        <img alt={preview.name} src={preview.image} />
        <GridListTileBar
          title={preview.name}
          subtitle={preview.description}
        />
      </GridListTile>
    </LinkContainer>
  )

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
      <GridList cols={2} spacing={2}>
        {communities.map(CommunityIndex.Preview)}
      </GridList>
    );
  }
}

export default CommunityIndex;
