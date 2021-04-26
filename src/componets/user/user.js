import React, { useContext, useEffect, useState } from 'react';
import './user.css';
import ServiceContext from '../service-context';
import ContactList from '../contact-list';
import CreateForm from '../create-form';
import SearchPannel from '../serch-pannel';

const User = ({ id }) => {
    const { getUser, createContact } = useContext(ServiceContext);
    const [user, setUser] = useState(null);
    const [find, setFind] = useState('');

    useEffect(() => {
        getUser(id)
            .then(dataUser => setUser(dataUser))
            .catch(err => alert(err))
    }, [getUser, id])

    const userUpdate = (update, callback = null) => {
        createContact(user.id, update)
            .then(data => setUser(user => {
                if (callback) { callback(); }
                return { ...user, contact: data.contact }
            }))
            .catch(err => alert(err))
    }

    const createNewContact = (contact, callback) => {
        if (contact.name && contact.phone) {
            const newContactList = (user.contact)
                ? { contact: [...user.contact, contact] }
                : { contact: [contact] }
            userUpdate(newContactList, callback)

        }
    }

    const editContact = (phone, changes, callback) => {
        const newArr = [...user.contact];
        const modif = newArr.findIndex(cont => cont.phone === phone);
        userUpdate({ contact: [...newArr.slice(0, modif), changes, ...newArr.slice(modif + 1)] }, callback)
    }

    const deleteContact = (phone) => {
        const newArr = [...user.contact];
        const del = newArr.findIndex(cont => cont === phone);
        const arr = [...newArr.slice(0, del), ...newArr.slice(del + 1)]
        userUpdate({ contact: [...arr] })
    }

    const foundContacts =  (user?.contact) && [...user.contact].filter(contact => (contact.name.indexOf(find) > -1));

    return (user) && (
        <div className="user" >
            <div className='user__side-bar'>
                <div className="user__descr">
                    <p className="user__name"> {user.login}</p>
                    <p className="user__name"> {user.phone}</p>
                </div>
            </div>
            <div className="user__contacts">
                <SearchPannel find={find} setFind={setFind} />
                <CreateForm createNewContact={createNewContact} />
                {(user.contact)
                    && <ContactList
                        contacts={foundContacts}
                        deleteContact={deleteContact}
                        editContact={editContact} />}
            </div>
        </div>
    )
}

export default User;