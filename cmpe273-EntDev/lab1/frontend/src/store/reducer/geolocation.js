import * as actionTypes from '../actions';

const initialState = {
    long: -1, lat: -1
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RENDER_TO_GEOLOCATION:
            console.log("GEO ACTION TRIGGERED HERE !", action.payload);
            return {
                long: action.payload.longitude,
                lat: action.payload.latitude
            };

        case actionTypes.FLUSH_GEOLOCATION:
            console.log("RES Initial state = ", initialState);
            return {
                long: -1, lat: -1
            }
    }
    return state;
};

export default reducer;
