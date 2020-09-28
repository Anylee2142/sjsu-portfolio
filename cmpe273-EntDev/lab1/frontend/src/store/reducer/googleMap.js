import * as actionTypes from '../actions';

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_TO_GOOGLE:
            console.log("GOOGLE ACTION TRIGGERED HERE !", action.payload);
            return action.payload;

        case actionTypes.FLUSH_GOOGLE:
            console.log("GOOGLE Initial state = ", initialState);
            return {
                google:null
            }
    }
    return state;
};

export default reducer;
