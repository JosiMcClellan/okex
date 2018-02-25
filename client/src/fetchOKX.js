export default function fetchOKX(path, options) {
  return fetch(`/api/v1/${path}`, options)
    .then(res => res.json())
    .catch(console.log);
}
