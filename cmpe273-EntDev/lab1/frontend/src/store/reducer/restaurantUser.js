import * as actionTypes from '../actions';

const initialState = {
    res_pk: "", name: "", email: "", password: "",
    phone_number: "", city: "", state: "", 
    res_long: "", res_lat: "", res_desc: "", type_of_food: "",
    is_dine_in_possible: "", is_pickup_possible: "", is_delivery_possible: "",
    avg_rating: ""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_TO_RESTAURANT_PROFILE:
            console.log("RESTAURANT USER TRIGGERED HERE !", action.payload);
            const newState = Object.assign(state, action.payload);
            console.log(newState);
            return newState;

        case actionTypes.FLUSH_RESTAURANT_PROFILE:
            console.log("Initial state = ", initialState);
            return {
                name: "", email: "", password: "",
                phone_number: "", city: "", state: "", country: "",
                res_long: "", res_lat: "", res_desc: "", type_of_food: "",
                is_dine_in_possible: "", is_pickup_possible: "", is_delivery_possible: "",
                avg_rating: ""
            }
    }
    return state;
};

export default reducer;
