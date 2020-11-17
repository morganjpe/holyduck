export const createBasketItem = (state, item) => {
  return [...state, item];
};

export const updateBasketItem = (state, index, quantity) => {
  const stateCopy = [...state];

  console.log(state, stateCopy[index], index);

  stateCopy[index].quantity = quantity;
  return stateCopy;
};

export const deleteBasketItem = (state, index) => {
  var stateCopy = [...state];
  stateCopy.splice(index, 1);
  return stateCopy;
};
