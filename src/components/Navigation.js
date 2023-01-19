import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({userinfoObj}) => {
    return (
        <>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/profile'>{userinfoObj.displayName}'s Profile</Link>
                </li>
            </ul>
        </>
    )
}

export default Navigation