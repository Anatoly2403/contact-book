import React from 'react';
import ContactListItem from '../contact-list-item';
import './contact-list.css';

const ContactList = ({ contacts, deleteContact, editContact }) => {
    return (
        <ul className="contact-list">
            {contacts.map((contact, i) =>
                <ContactListItem
                    key={i}
                    contact={contact}
                    deleteContact={deleteContact}
                    editContact={editContact}
                />)}
        </ul>
    )
}

export default ContactList;