exports.getDate = () => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  const formattedDate = new Date().toLocaleDateString('en-US', options);

  return formattedDate;
};

exports.getDay = () => {
  const options = { weekday: 'long' };
  const formattedDay = new Date().toLocaleDateString('en-US', options);

  return formattedDay;
};
