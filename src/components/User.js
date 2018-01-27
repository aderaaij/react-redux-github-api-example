import React from 'react';
import PropTypes from 'prop-types';

import Repos from './Repos';

const User = (props) => {    
    const { currentUserData, userRepos } = props;
    const { userData } = currentUserData;
    const { repos, isFetching } = userRepos;
    return (
        <div>
            <h1>{userData.login}</h1>
            <img 
                style={{ width: '150px', height: '150px' }}
                src={userData.avatar_url} 
            />
            {!isFetching && repos.length === 0 && 
                <h2>No repos found for user {userData.login}</h2>
            }
            {!isFetching && repos.length > 0 &&
                <div>
                    <h2>Repos</h2>
                    <Repos repos={repos} />
                </div>
            }
        </div>
    )    
}

User.propTypes = {
    currentUserData: PropTypes.object.isRequired,
    userRepos: PropTypes.object.isRequired,
};

export default User;
