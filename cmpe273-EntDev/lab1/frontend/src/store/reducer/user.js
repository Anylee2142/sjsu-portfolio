import * as actionTypes from '../actions';

const initialState = {
    name: "", email: "", password: "",
    phone_number: "", favorite: "", til: "", website: "",
    dob: "", city: "", state: "", country: "", nickname: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_TO_PROFILE:
            console.log("ACTION TRIGGERED HERE !", action.payload);
            const newState = Object.assign(state, action.payload);
            console.log(newState);
            return newState;

        case actionTypes.FLUSH_USER:
            // return Object.assign({}, initialState);
            console.log("Initial state = ", initialState);
            return {
                name: "", email: "", password: "",
                phone_number: "", favorite: "", til: "", website: "",
                dob: "", city: "", state: "", country: "", nickname: ""
            }
        // case actionTypes.DECREMENT:
        //     return {
        //         ...state,
        //         counter: state.counter - 1
        //     }
        // case actionTypes.ADD:
        //     return {
        //         ...state,
        //         counter: state.counter + action.val
        //     }
        // case actionTypes.SUBTRACT:
        //     return {
        //         ...state,
        //         counter: state.counter - action.val
        //     }
    }
    return state;
};

export default reducer;
