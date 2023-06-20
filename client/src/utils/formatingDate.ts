const formatingDate = (date: string) => {
  if (!date) return 'no value';
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dateArr = date.split(/[^0-9]/);

  const year = dateArr[0];
  const month = months[Number(dateArr[1]) - 1];
  const day = dateArr[2];
  const hours = dateArr[3];
  const minutes = dateArr[4];

  const formattedDate = `${month} ${day}, ${year} at ${hours}:${minutes}`;

  return formattedDate;
};

export default formatingDate;
