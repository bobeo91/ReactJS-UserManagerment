import * as actionTypes from "../constants/constants";

const initState = {
    sidebarIsOpen: true,
    formGroupIsOpen:false
}
const viewReducer = (state=initState, action) => {
    switch(action.type) {
        case actionTypes.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarIsOpen: !state.sidebarIsOpen
            }
        case actionTypes.TOGGLE_FROM_GROUP:
            return {
                ...state,
                formGroupIsOpen: action.payload.isOpenFormGroup?true:false
            }
        
        default: 
            return state;
    }
}

export default viewReducer;