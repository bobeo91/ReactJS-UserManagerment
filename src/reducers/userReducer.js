import * as actionTypes from '../constants/constants.js';


const initState = {
    isLoading: false,
    errMessage: null,
    userInfo: {},

    //groups
    listGroups: [],
    totalPagesListGroups: 0,
    deleted: false,
    created: false,
    updated: false

}

const userReducer = (state = initState, action) => {

    console.log(action);

    if (action.payload) {
        console.log(action.payload);
        console.log(action.payload.errMessage);
    }

    switch (action.type) {
        //Signin
        case actionTypes.USER_SIGNIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload
            }
        case actionTypes.USER_SIGNIN_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload.errMessage
            }

        //CHANGE PASSWORD
        case actionTypes.USER_CHANGING_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.USER_CHANGING_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload
            }
        case actionTypes.USER_CHANGING_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload.errMessage
            }
        //Signup
        case actionTypes.USER_SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                errMessage: null
            }
        case actionTypes.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case actionTypes.USER_SIGNUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        //Get user info
        case actionTypes.GET_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                errMessage: null
            }
        case actionTypes.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload
            }
        case actionTypes.GET_USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        //Update user info
        case actionTypes.UPDATE_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                errMessage: null
            }
        case actionTypes.UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload
            }
        case actionTypes.UPDATE_USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        //Get ListGroup
        case actionTypes.GET_LIST_GROUP_REUEST:
            return {
                ...state,
                isLoading: true,
                errMessage: null
            }
        case actionTypes.GET_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listGroups: action.payload.listGroups,
                totalPagesListGroups: action.payload.totalPagesListGroups
            }
        case actionTypes.GET_LIST_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        // Create group
        case actionTypes.CREATE_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                created: false
            }
        case actionTypes.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                created: true
            }
        case actionTypes.CREATE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        // Update group
        case actionTypes.UPDATE_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                updated: false
            }
        case actionTypes.UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updated: true
            }
        case actionTypes.UPDATE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }
        // Delete group
        case actionTypes.DELETE_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                deleted: false
            }
        case actionTypes.DELETE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleted: true
            }
        case actionTypes.DELETE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errMessage: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;