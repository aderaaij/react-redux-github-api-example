import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import * as actions from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
    it('Should create a user to fetch a repo with', () => {
        const user = 'aderaaij';
        const expectedAction = {
            type: 'SELECT_USER',
            user,
        };
        expect(actions.selectUser(user)).toEqual(expectedAction);
    });

    // it('Should swith a boolean to let us know fetching started', () => {
    //     const expectedAction = {
    //         type: 'REQUEST_USERDATA',
    //     };
    //     expect(actions.requestUserData()).toEqual(expectedAction);
    // });
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('creates RECEIVE_USERDATA when fetching user data has been done', () => {
        fetchMock.getOnce('/user', {
            userData: { login: ['aderaaij'] },
            headers: { 'content-type': 'application/json' },
        });

        const user = 'aderaaij';
        const expectedActions = [
            { type: 'REQUEST_USERDATA' },
            {
                type: 'RECEIVE_USERDATA',
                userData: {},
            },
        ];
        const store = mockStore({ userData: {} });

        return store.dispatch(actions.fetchUserData(user)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
