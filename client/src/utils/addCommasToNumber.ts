const addCommasToNumber = (number: number): string =>
  // eslint-disable-next-line implicit-arrow-linebreak
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default addCommasToNumber;
