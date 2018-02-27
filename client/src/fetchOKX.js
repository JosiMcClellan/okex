export default function fetchOKX(path, options) {
  return fetch(`/api/v1/${path}`, options)
    .then(res => res.json())
    .then((res) => {
      if (res.error) throw res.error;
      return res;
    })
    .catch(console.log);
}

fetchOKX.withToken = (token, path, options) => {
  const header = new Headers({ Authorization: `Token ${token}` });
  return fetchOKX(path, { headers: header, ...options });
};
