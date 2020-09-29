import * as actionTypes from '../actions';

const initialState = {
    menus: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_TO_MENU:
            console.log("MENU ACTION TRIGGERED HERE !", action.payload);
            return {
                menus: action.payload
            };

        case actionTypes.FLUSH_MENU:
            console.log("MENU Initial state = ", initialState);
            return {
                menus: null
            }
    }
    return state;
};

export default reducer;
