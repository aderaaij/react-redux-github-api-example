export const SELECT_USER = 'SELECT_USER';
export const REQUEST_USERDATA = 'REQUEST_USERDATA';
export const RECEIVE_USERDATA = 'RECEIVE_USERDATA';
export const REQUEST_REPOS = 'REQUEST_REPOS';
export const RECEIVE_REPOS = 'RECEIVE_REPOS';

export function selectUser(user) {
    return {
        type: SELECT_USER,
        user
    }
}

function requestUserData(user) {
    return {
        type: REQUEST_USERDATA,
        user
    }
}

function receiveUserData(user, json) {
    return {
        type: RECEIVE_USERDATA,
        user,
        userData: json,
    }
}

function requestRepos(user) {
    return {
        type: REQUEST_REPOS,
        user
    }
}

function receiveRepos(user, json) {
    return {
        type: RECEIVE_REPOS,
        user,
        repos: json,
    }
}

function fetchUserData(user) {
    return dispatch => {
        dispatch(requestUserData(user))
        return fetch(`https://api.github.com/users/${user}`)
            .then(res => res.json())
            .then(json => dispatch(receiveUserData(user, json)))
    }
}

function fetchRepos(user) {
    return dispatch => {
        dispatch(requestRepos(user))
        return fetch(`https://api.github.com/users/${user}/repos`)
            .then(res => res.json())
            .then(json => dispatch(receiveRepos(user, json)))
    }
}

export function fetchUserAndRepos(user) {
    return (dispatch, getState) => {
        return dispatch(fetchUserData(user)).then(() => {
            const { currentUserData } = getState(); 
            if (!currentUserData.isFetching && currentUserData.userData.message) {
                return false;
            }
            return dispatch(fetchRepos(user));
        })
    }
}