import PropTypes from 'prop-types';

const {
  number,
  string,
  arrayOf,
  shape,
} = PropTypes;
const id = number.isRequired;
const reqStr = string.isRequired;


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
  response: reqStr,
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
