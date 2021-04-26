import React, { useState } from 'react';
import './contact-list-item.css';
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons'

const ContactListItem = ({ contact, deleteContact, editContact }) => {
    const [edit, setEdit] = useState(false);
    const [changes, setСhanges] = useState(contact);

    const handleCahnge = ({ target: { name, value } }) => {
        setСhanges(changes => ({ ...changes, [name]: value }))
    }

    const sendUpdate = () => {
        editContact(contact.phone, changes, () => setEdit(false));
    }

    return (
        <li className='list-item'>
            <div className="list-item___descr">
                <p className='list-item___name'>
                    {edit
                        ? <input type="text" name='name' value={changes.name} onChange={handleCahnge} />
                        : contact.name}
                </p>
                <p className='list-item___phone'>
                    {edit
                        ? <input type="text" name='phone' value={changes.phone} onChange={handleCahnge} />
                        : contact.phone}
                </p>
            </div>
            <div className="list-item___control">
                <button className='list-item___edit'>
                    {(!edit)
                        ? <EditOutlined onClick={() => setEdit(true)} />
                        : <CheckOutlined onClick={sendUpdate} />}
                </button>
                <button className='list-item___delete'>
                    <DeleteOutlined onClick={() => deleteContact(contact)} />
                </button>
            </div>
        </li>
    )
}

export default ContactListItem;