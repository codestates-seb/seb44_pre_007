/* eslint-disable implicit-arrow-linebreak */
const htmlTagIgnore = (content: string) =>
  content.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/gi, '');

export default htmlTagIgnore;
