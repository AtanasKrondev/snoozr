import React, { useEffect, useState, useContext } from 'react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { commentsRef } from '../../firebase';
import { CircularProgress } from '@material-ui/core';
import { NotificationsContext } from '../../providers/NotificationsProvider';

export default function CommentContainer({ task }) {
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showMessage } = useContext(NotificationsContext)
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
            }, error => { console.log(error); showMessage(error.message, 'error') })
        return () => cleanUp();
    }, [task, showMessage])

    return (<>
        <CommentForm task={task} />
        {loading ? <CircularProgress color="secondary" /> :
            <>{comments.map(comment => <CommentCard key={comment.id} comment={comment} authorId={comment.author} task={task} />)}</>}
    </>)
}