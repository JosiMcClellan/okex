import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import fetchIndex from '../../../fetchers/communities/index';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { communities: null };
  }

  componentDidMount() {
    fetchIndex().then(communities => this.setState({ communities }));
  }

  render() {
    const { communities } = this.state;
    if (!communities) return 'Loading';
    return (
      <GridList cols={3} padding={10}>
        {communities.map(preview => (
          <LinkContainer key={preview.id} to={{ state: preview, pathname: `c/${preview.id}` }}>
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

export default Index;
