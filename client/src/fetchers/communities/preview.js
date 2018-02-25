import fetchOKX from '../../fetchOKX';

export default id => fetchOKX(`communities/${id}/preview`);
