import PropTypes from 'prop-types';

const {
  number,
  string,
  arrayOf,
  shape,
} = PropTypes;
const id = number.isRequired;

const accountShape = {
  id,
  token: string.isRequired,
  email: string.isRequired,
};

const communityShape = {
  id,
  slug: string.isRequired,
  name: string.isRequired,
  description: string.isRequired,
  founded: string.isRequired,
  active: string.isRequired,
  image: string.isRequired,
};

const profileShape = {
  handle: string.isRequired,
};

const fieldShape = {
  prompt: string.isRequired,
  response: string.isRequired,
};

const postShape = {
  body: string.isRequired,
  posted: string.isRequired,
};

const discussionShape = {
  topic: string.isRequired,
  started: string.isRequired,
  active: string.isRequired,
  posts: arrayOf(shape(postShape)),
};

export * from 'prop-types';
export {
  accountShape,
  communityShape,
  fieldShape,
  profileShape,
  postShape,
  discussionShape,
};
