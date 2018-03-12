const idMap = arr => new Map(arr.map(({ id, ...rest }) => [id, rest]));

export { idMap };
