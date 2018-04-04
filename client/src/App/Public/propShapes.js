import PropTypes from 'prop-types';

const id = PropTypes.number.isRequired;
const reqStr = PropTypes.string.isRequired;


const accountShape = {
  id,
  token: reqStr,
  email: reqStr,
};

const communityShape = {
  id,
  slug: reqStr,
  name: reqStr,
  description: reqStr,
  founded: reqStr,
  active: reqStr,
  image: reqStr,
};

const profileShape = {
  id,
  handle: reqStr,
};

const fieldShape = {
  id,
  prompt: reqStr,
  response: PropTypes.string,
};

const postShape = {
  id,
  body: reqStr,
  posted: reqStr,
};

const discussionShape = {
  id,
  topic: reqStr,
  started: reqStr,
  active: reqStr,
  posts: PropTypes.arrayOf(PropTypes.shape(postShape)),
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
