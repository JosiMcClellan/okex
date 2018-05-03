const read = res => res.text();

const parse = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    throw new Error(`invalid json response: ${json}`);
  }
};

const throwIfError = (res) => {
  if (res && res.error) throw res.error;
  return res;
};

export default function fetchOKX(path, options) {
  return fetch(`/api/v1/${path}`, options)
    .then(read)
    .then(parse)
    .then(throwIfError);
}
