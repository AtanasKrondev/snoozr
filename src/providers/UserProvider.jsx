import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setLoading(true)
            setUser(user)
            setLoading(false)
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
    )
}