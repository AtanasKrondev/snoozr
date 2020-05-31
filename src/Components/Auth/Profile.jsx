import React, { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';

export default function Profile() {
    const user = useContext(UserContext);
    return (
        <div>
            <div>{user && user.displayName}</div>
            <div>{user && user.photoURL}</div>
            <div>{user && user.email}</div>
        </div>
    )
}