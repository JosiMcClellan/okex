import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { shape, communityShape } from '../propShapes';

const Preview = (community) => {
  const {
    slug, name, image, description,
  } = community;
  return (
    <LinkContainer key={slug} to={{ state: community, pathname: `c/${slug}` }}>
      <GridListTile>
        <img alt={name} src={image} />
        <GridListTileBar
          title={name}
          subtitle={description}
        />
      </GridListTile>
    </LinkContainer>
  );
};
Preview.propTypes = {
  community: shape(communityShape).isRequired,
};

export default Preview;
