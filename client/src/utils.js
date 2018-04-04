const idMap = arr => new Map(arr.map(({ id, ...rest }) => [id, rest]));

// because more will follow...
// eslint-disable-next-line
export { idMap };
