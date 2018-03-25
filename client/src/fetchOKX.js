const throwIfError = (res) => {
  if (res && res.error) throw res.error;
  return res;
};

export default function fetchOKX(path, options) {
  return fetch(`/api/v1/${path}`, options)
    .then(res => res.json())
    .then(throwIfError);
}
