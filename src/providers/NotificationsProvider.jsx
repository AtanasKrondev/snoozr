import React, { createContext, useState } from 'react';

export const NotificationsContext = createContext();

// {
//     message: 'makariosh',
//     open: false,
//     toggleMessage: () => { },
//     toggleOpen: () => { }
// }

export default function NotificationsProvider({ children }) {
    const [message, setMessage] = useState('makari');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('info')
    const showMessage = (newMessage, newSeverity) => {
        setMessage(newMessage);
        setSeverity(newSeverity)
        setOpen(true);
        // setTimeout(() => setOpen(false), 3000)
    };

    return (
        <NotificationsContext.Provider value={{ message, open, severity, showMessage, setOpen }}>{children}</NotificationsContext.Provider>
    )
}
