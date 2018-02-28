export default function fetchOKX(path, options) {
  return fetch(`/api/v1/${path}`, options)
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      return res;
    })
    .catch(console.log);
}
