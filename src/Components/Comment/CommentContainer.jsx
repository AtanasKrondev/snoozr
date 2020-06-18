import React from 'react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { useState } from 'react';
import { useEffect } from 'react';
import { commentsRef } from '../../firebase';
import { CircularProgress } from '@material-ui/core';

export default function CommentContainer({ task }) {
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const cleanUp = commentsRef
            .where('task', '==', task)
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setLoading(true);
                let commentsSnapshot = [];
                snapshot.forEach(entry => {
                    const id = entry.id;
                    const data = entry.data()
                    commentsSnapshot.push({ id, ...data })
                })
                setComments(commentsSnapshot);
                setLoading(false);
            }, error => console.error(error))
        return () => cleanUp();
    }, [task])

    return (<>
        <CommentForm task={task} />
        {loading ? <CircularProgress color="secondary" /> :
            <>{comments.map(comment => <CommentCard key={comment.id} comment={comment} authorId={comment.author} task={task} />)}</>}
    </>)
}