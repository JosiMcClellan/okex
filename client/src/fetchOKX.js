export default function fetchOKX(path, options) {
  return fetch(`/api/v1/${path}`, options)
    .then((res) => {
      if (res.ok) return res.json();
      throw res;
    }).catch(console.log);
}

fetchOKX.withToken = (token, path, options) => {
  const header = new Headers({ Authorization: token });
  return fetchOKX(path, { headers: header, ...options });
};
