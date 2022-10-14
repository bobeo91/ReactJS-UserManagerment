import * as actionTypes from "../constants/constants"

const toggleSidebar = () => {
    return {
        type: actionTypes.TOGGLE_SIDEBAR,
        payload: null
    }
}
const toggleFormGroup = (isOpen) => {
    return {
        type: actionTypes.TOGGLE_FROM_GROUP,
        payload: {
            isOpenFormGroup: isOpen
        }
    }
}


const viewActions = {
    toggleSidebar,
    toggleFormGroup
}

export default viewActions;