import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as actions from '../actions';
import * as types from '../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
    it('Should create a user to fetch a repo with', () => {
        const user = 'aderaaij';
        const expectedAction = {
            type: types.SELECT_USER,
            user,
        };
        expect(actions.selectUser(user)).toEqual(expectedAction);
    });

    it('Should swith a boolean to let us know fetching started', () => {
        const expectedAction = {
            type: types.REQUEST_USERDATA,
        };
        expect(actions.requestUserData()).toEqual(expectedAction);
    });
});

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    const mockResult = { login: 'aderaaij' };
    const user = 'aderaaij';

    it('creates RECEIVE_USERDATA when fetching is done', () => {
        fetchMock.get(`https://api.github.com/users/${user}`, mockResult);
        const expectedActions = [
            { type: types.REQUEST_USERDATA },
            {
                type: types.RECEIVE_USERDATA,
                userData: mockResult,
            },
        ];

        const store = mockStore({ userData: {} });

        return store.dispatch(actions.fetchUserData(user)).then(data => {
            const dispatchedActions = store.getActions();
            expect(dispatchedActions).toEqual(expectedActions);
        });
    });
});
