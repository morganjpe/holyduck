import {
    CREATE,
    UPDATE,
    DELETE,
} from './commands';

import {
    createBasketItem,
    updateBasketItem,
    deleteBasketItem,
} from './actions';

export const basketReducer = (state = [], action) => {
    const {type, payload: {item, index, quantity}} = action;

    switch(type) {
        case CREATE : return createBasketItem(state, item);
        case UPDATE : return updateBasketItem(state, index, quantity);
        case DELETE : return deleteBasketItem(state, index);
        default : return state;
    }
}