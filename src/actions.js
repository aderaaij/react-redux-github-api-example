import {
    SELECT_USER,
    REQUEST_USERDATA,
    RECEIVE_USERDATA,
    RECEIVE_USERDATA_ERROR,
    REQUEST_REPOS,
    RECEIVE_REPOS,
    RECEIVE_REPOS_ERROR,
} from './constants/ActionTypes';

export function selectUser(user) {
    return {
        type: SELECT_USER,
        user,
    };
}

export function requestUserData() {
    return {
        type: REQUEST_USERDATA,
    };
}

function receiveUserData(json) {
    return {
        type: RECEIVE_USERDATA,
        userData: json,
    };
}

function receiveUserDataErr(error) {
    return {
        type: RECEIVE_USERDATA_ERROR,
        error,
    };
}

function requestRepos() {
    return {
        type: REQUEST_REPOS,
    };
}

function receiveRepos(json) {
    return {
        type: RECEIVE_REPOS,
        repos: json,
    };
}

function receiveReposErr(error) {
    return {
        type: RECEIVE_REPOS_ERROR,
        error,
    };
}

export function fetchUserData(user) {
    return dispatch => {
        dispatch(requestUserData());
        return fetch(`https://api.github.com/users/${user}`)
            .then(res => res.json())
            .then(json => dispatch(receiveUserData(json)))
            .catch(err => dispatch(receiveUserDataErr(err)));
    };
}

function fetchRepos(user) {
    return dispatch => {
        dispatch(requestRepos());
        return fetch(`https://api.github.com/users/${user}/repos`)
            .then(res => res.json())
            .then(json => dispatch(receiveRepos(json)))
            .catch(err => dispatch(receiveReposErr(err)));
    };
}

export function fetchUserAndRepos(user) {
    return (dispatch, getState) => {
        return dispatch(fetchUserData(user)).then(() => {
            const { currentUserData } = getState();
            if (
                !currentUserData.isFetching &&
                currentUserData.userData.message
            ) {
                return;
            }
            return dispatch(fetchRepos(user));
        });
    };
}
