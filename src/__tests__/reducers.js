import * as types from '../constants/ActionTypes';
import rootReducer, {
    currentUser,
    currentUserData,
    userRepos,
} from '../reducers';

describe('reducer tests', () => {
    it('should set the initial state', () => {
        expect(
            currentUser('', {
                type: types.SELECT_USER,
            })
        ).toEqual();
    });

    it('should handle adding a user', () => {
        const user = 'aderaaij';
        expect(
            currentUser('', {
                type: types.SELECT_USER,
                user,
            })
        ).toEqual(user);
    });

    it('should handle current userData', () => {
        expect(
            currentUserData(
                {},
                {
                    type: types.REQUEST_USERDATA,
                    isFetching: true,
                }
            )
        ).toEqual({ isFetching: true });

        expect(
            currentUserData(
                {},
                {
                    type: types.RECEIVE_USERDATA,
                    isFetching: false,
                }
            )
        ).toEqual({ isFetching: false, userData: undefined });

        expect(
            currentUserData(
                {},
                {
                    type: types.RECEIVE_USERDATA_ERROR,
                    isFetching: false,
                }
            )
        ).toEqual({ isFetching: false, userData: undefined });
    });

    it('should handle the user repos', () => {
        expect(
            userRepos(
                {},
                {
                    type: types.REQUEST_REPOS,
                    isFetching: true,
                }
            )
        ).toEqual({ isFetching: true });

        expect(
            userRepos(
                {},
                {
                    type: types.RECEIVE_REPOS,
                    isFetching: false,
                }
            )
        ).toEqual({ isFetching: false });

        expect(
            userRepos(
                {},
                {
                    type: types.RECEIVE_REPOS_ERROR,
                    isFetching: false,
                }
            )
        ).toEqual({ isFetching: false });
    });
});
