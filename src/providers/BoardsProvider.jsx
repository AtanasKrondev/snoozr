import React, { createContext, useState, useEffect, useContext } from 'react';
import { boardsRef } from '../firebase';
import { UserContext } from './UserProvider';

export const BoardsContext = createContext();

export default function BoardsProvider({ children }) {
    const [boards, setBoards] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    useEffect(() => {
        const uid = user ? user.uid : '';
        const cleanUp = boardsRef
            .where('author', '==', uid)
            .onSnapshot(snapshot => {
                setLoading(true);
                let boardsSnapshot = [];
                snapshot.forEach(entry => {
                    const id = entry.id;
                    const data = entry.data()
                    boardsSnapshot.push({ id, ...data })
                })
                setBoards(boardsSnapshot);
                setLoading(false);
            }, error => console.error(error));
        return () => cleanUp();
    }, [user])

    return (
        <BoardsContext.Provider value={{ boards, loading }}>{children}</BoardsContext.Provider>
    )
}