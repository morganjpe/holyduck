export const createBasketItem = (state, item) => {
    return [...state, item];
}

export const updateBasketItem = (state, index, quantity) => {
    const stateCopy = [...state];
    stateCopy[index].quantity += quantity;
    return stateCopy;
}

export const deleteBasketItem = (state, index) => {
    return state.splice(index, 1);
}