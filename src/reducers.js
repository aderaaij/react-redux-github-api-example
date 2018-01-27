import { combineReducers } from 'redux';
import {
    SELECT_USER,
    REQUEST_USERDATA,
    RECEIVE_USERDATA,
    RECEIVE_USERDATA_ERROR,
    REQUEST_REPOS,
    RECEIVE_REPOS,
    RECEIVE_REPOS_ERROR,
} from './actions';

function currentUser(state = '', action) {
    switch (action.type) {
        case SELECT_USER:
            return action.user;
        default:
            return state;
    }
}

function currentUserData(
    state = {
        isFetching: false,
        userData: {},
    },
    action
) {
    switch (action.type) {
        case REQUEST_USERDATA:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_USERDATA:
            return Object.assign({}, state, {
                isFetching: false,
                userData: action.userData,
            });
        case RECEIVE_USERDATA_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                userData: action.error,
            });
        default:
            return state;
    }
}

function userRepos(
    state = {
        isFetching: false,
        repos: [],
    },
    action
) {
    switch (action.type) {
        case REQUEST_REPOS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case RECEIVE_REPOS:
            return Object.assign({}, state, {
                isFetching: false,
                repos: action.repos,
            });
        case RECEIVE_REPOS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                repos: action.error,
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    currentUser,
    currentUserData,
    userRepos,
});

export default rootReducer;
