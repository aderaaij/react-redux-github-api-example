import { combineReducers } from 'redux';
import {
    SELECT_USER,
    REQUEST_USERDATA,
    RECEIVE_USERDATA,
    REQUEST_REPOS,
    RECEIVE_REPOS,
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
