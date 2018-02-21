export default function fetchOKX(path) {
  return fetch(`/api/v1/${path}`).then(res => res.json());
}
