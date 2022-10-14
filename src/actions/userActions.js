import axios from "axios";
import * as actionTypes from '../constants/constants.js';
import viewActions from "./viewActions.js";


let token = localStorage.getItem('token');

const signin = (username, password) => async dispatch => {

    dispatch({
        type: actionTypes.USER_SIGNIN_REQUEST
    })

    try {
        const response = await axios.post('/api/auth/signin', {
            username: username,
            password: password
        })

        console.log(response.data);

        dispatch({
            type: actionTypes.USER_SIGNIN_SUCCESS,
            payload: response.data
        })

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('login', true)

        window.location.replace('/');
    } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);

        dispatch({
            type: actionTypes.USER_SIGNIN_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: error.response.data
            }
        })
    }
}

const changePassword = ({ username, password }) => async dispatch => {

    dispatch({
        type: actionTypes.USER_CHANGING_PASSWORD_REQUEST
    })

    try {
        const response = await axios({
            method: 'POST',
            url: '/api/accounts/password-changing?username=' + username + '&newPassword=' + password,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        dispatch({
            type: actionTypes.USER_CHANGING_PASSWORD_SUCCESS,
            payload: response.data
        })
        alert('Change password success, Please relogin ')
        window.location.replace('/signin');

    } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);

        dispatch({
            type: actionTypes.USER_CHANGING_PASSWORD_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: error.response.data
            }
        })
    }
}

const signup = user => async (dispatch) => {
    console.log('user info in the userActions: ');
    console.log(user);
    dispatch({
        type: actionTypes.USER_SIGNUP_REQUEST
    })

    try {
        const response = await axios.post('/api/auth/signup', {
            ...user
        })

        console.log(response);

        console.log(response.data);

        dispatch({
            type: actionTypes.USER_SIGNUP_SUCCESS,
            payload: response.data
        })

        window.location.replace('/signin');

    } catch (error) {
        console.log(error);
        console.log(error.response);

        dispatch({
            type: actionTypes.USER_SIGNUP_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: error.response.data
            }
        })
    }
}

const getUserInfo = username => async (dispatch) => {

    dispatch({
        type: actionTypes.GET_USER_INFO_REQUEST
    })

    try {
        const response = await axios.get('/api/accounts/' + username, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(response);
        console.log(response.data);

        dispatch({
            type: actionTypes.GET_USER_INFO_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        console.log(error);
        console.log(error.response);

        dispatch({
            type: actionTypes.GET_USER_INFO_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: error.response.data
            }
        })
    }
}

const updateUserInfo = (user, avatarUploadFile) => async (dispatch) => {

    console.log('user info in UpdateAction: ');
    console.log(user);

    dispatch({
        type: actionTypes.UPDATE_USER_INFO_REQUEST
    })

    try {
        if (avatarUploadFile) {
            var formData = new FormData();
            formData.append("image", avatarUploadFile, avatarUploadFile.name);
            let responseUpload = await axios({
                method: 'POST',
                url: 'http://localhost:8888/api/files/image',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: formData
            })
            console.log('responseUpload',responseUpload);
            
            const response = await axios({
                method: 'PUT',
                url: '/api/accounts/' + user.id,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: localStorage.getItem('role').replace('[', '').replace(']', ''),
                    status: 'ACTIVE',
                    avatarUrl: responseUpload ? responseUpload.data : ''
                }
            })
            console.log('responseUpdate have avatar',response);
            localStorage.setItem('avatarUrl', responseUpload.data)

            dispatch({
                type: actionTypes.UPDATE_USER_INFO_SUCCESS,
                payload: responseUpload.data
            })
        } else {
            const response = await axios({
                method: 'PUT',
                url: '/api/accounts/' + user.id,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: localStorage.getItem('role').replace('[', '').replace(']', ''),
                    status: 'ACTIVE',
                    avatarUrl: localStorage.getItem('avatarUrl') ? localStorage.getItem('avatarUrl') : ''
                }
            })
            dispatch({
                type: actionTypes.UPDATE_USER_INFO_SUCCESS,
                payload: response.data
            })
        }

    } catch (error) {
        console.log(error);
        console.log(error.response);

        dispatch({
            type: actionTypes.UPDATE_USER_INFO_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: error.response.data
            }
        })
    }
}
const getListGroups = (groupFilterForm) => async (dispath) => {

    console.log({groupFilterForm});
    dispath({
        type: actionTypes.GET_LIST_GROUP_REUEST
    })

    try {
        if (groupFilterForm) {
            let startDateConvert = null
            if (groupFilterForm.startDate != null) {
                startDateConvert =  groupFilterForm.startDate.getDate()
                 + '/' + (groupFilterForm.startDate.getMonth() + 1)
                 + '/' + groupFilterForm.startDate.getFullYear()
            }
            let endDateConvert = null
            if (groupFilterForm.endDate != null) {
                endDateConvert =  groupFilterForm.endDate.getDate()
                 + '/' + (groupFilterForm.endDate.getMonth() + 1)
                 + '/' + groupFilterForm.endDate.getFullYear()
            }

            /* Format input date to filter by DateTime example */
            // startDateConvert = '2022-05-15 09:12:03'
            // endDateConvert = '2022-05-20 09:27:15'

            let url = 'http://localhost:8888/api/groups/paging?'
             + 'pageNumber=' + groupFilterForm.pageNumber
             + '&size=' + groupFilterForm.pageSize 
             + '&sort=' + groupFilterForm.sort 
             + '&type=' + groupFilterForm.type 
             + '&startDate=' + startDateConvert 
             + '&endDate=' + endDateConvert

            const response = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
            })
            console.log('getGroup response',response.data);
            dispath({
                type: actionTypes.GET_LIST_GROUP_SUCCESS,
                payload: {
                    listGroups: response.data.content,// Array group
                    totalPagesListGroups: response.data.totalPages 
                }
            })
        }else {
        let url = 'http://localhost:8888/api/groups'

        const response = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        dispath({
            type: actionTypes.GET_LIST_GROUP_SUCCESS,
            payload: {
                listGroups: response.data,
                totalPagesListGroups: response.data.length // Array group
            }
        })
        }
    } catch (error) {
        dispath({
            type: actionTypes.GET_LIST_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: "Get list groups fail"
            }
        })
    }
}

const deleteGroup = (groupId) => async dispatch => {
   
    dispatch({
        type: actionTypes.DELETE_GROUP_REQUEST
    })
    
    try {
  
        const response = await axios({
            url: '/api/groups',
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                id: groupId
            }
        })
        console.log('DeleteGroup response', response.data)
        dispatch({
            type: actionTypes.DELETE_GROUP_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: 'Delete group fail! '
            }
        })
    }
}

const createGroup = (groupItem) => async (dispatch) => {

    console.log('Create group: ', groupItem)

    dispatch({
        type: actionTypes.CREATE_GROUP_REQUEST
    })
    try {
        const response = await axios({
            url: '/api/groups',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                name: groupItem.name,
                type: groupItem.type,
                createdAt: groupItem.createdAt,
                totalMember: groupItem.totalMember
            })
        })
        console.log('Create Group response: ', response.data)

        dispatch({
            type: actionTypes.CREATE_GROUP_SUCCESS,
            payload: response.data
        })
        //close form
        dispatch(viewActions.toggleFormGroup(false))

    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: 'Create group fail! '
            }
        })
    }

}
const updateGroup = (groupItem) => async (dispatch) => {

    console.log('Update group: ', groupItem)

    dispatch({
        type: actionTypes.UPDATE_GROUP_REQUEST
    })
    try {
        const response = await axios({
            url: '/api/groups?id=' + groupItem.id,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                name: groupItem.name,
                type: groupItem.type,
                createdAt: groupItem.createdAt,
                totalMember: groupItem.totalMember
            })
        })
        console.log('Update Group response: ', response.data)

        dispatch({
            type: actionTypes.UPDATE_GROUP_SUCCESS,
            payload: response.data
        })
        //close form
        dispatch(viewActions.toggleFormGroup(false))

    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                errMessage: 'Create group fail! '
            }
        })
    }

}

const userActions = {
    signin,
    signup,
    getUserInfo,
    updateUserInfo,
    getListGroups,
    deleteGroup,
    updateGroup,
    createGroup,
    changePassword,
}

export default userActions;