import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import communitiesFetcher from '../../fetchers/communities';

class CommunityIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { communities: null };
  }

  componentDidMount() {
    communitiesFetcher.index()
      .then(communities => this.setState({ communities }));
  }

  render() {
    const { communities } = this.state;
    if (!communities) return 'Loading';
    return (
      <GridList cols={3} padding={10}>
        {communities.map(preview => (
          <LinkContainer key={preview.slug} to={{ state: preview, pathname: `c/${preview.slug}` }}>
            <GridListTile
              rows={3}
            >
              <img alt={preview.name} src={preview.image_url} />
              <GridListTileBar
                title={preview.name}
                subtitle={preview.description}
              />
            </GridListTile>
          </LinkContainer>
        ))}
      </GridList>
    );
  }
}

export default CommunityIndex;
