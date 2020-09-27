import * as actionTypes from '../actions';

const initialState = {
    restaurants: null,
};

// {
//     name: "", phone_number: "", avg_rating: "",
//     city: "", state: "", type_of_food: "", res_desc: "",
//     is_dine_in_possible: "",
//     is_delivery_possible: "",
//     is_pickup_possible: ""
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_TO_RESTAURANT:
            // TODO: update individually here in case
            console.log("RES ACTION TRIGGERED HERE !", action.payload);
            return {
                restaurants: action.payload
            };

        case actionTypes.FLUSH_SEARCH:
            console.log("RES Initial state = ", initialState);
            return {
                restaurants: null
            }
    }
    return state;
};

export default reducer;
