export const formatDate = (dateObj) => {
  const date = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `${date}:${month}:${year}`;
};
