import React, { useState } from 'react';
import './create-form.css';

const CreateForm = ({ createNewContact }) => {
    const [contact, setContact] = useState({ name: '', phone: '' });
    const [create, setCreate] = useState(false);

    const handleChange = ({ target: { name, value } }) => {
        setContact(contact => ({ ...contact, [name]: value }))
    }

    const createContact = (e) => {
        e.preventDefault();
        createNewContact(contact, ()=>setCreate(false))
        setContact({ name: '', phone: '' });
    }

    return (
        <div className="create-form">
            <button className='create-form__btn' onClick={() => setCreate(true)}>Create contact</button>
            {(create) && (
                <form action="#" className='user__create-form' onSubmit={createContact} >
                    <label htmlFor="name"> name <br />
                        <input type="text" name='name' value={contact.name} onChange={handleChange} />
                    </label>
                    <label htmlFor="phone"> phone <br />
                        <input type="text" name='phone' value={contact.phone} onChange={handleChange} />
                    </label>
                    <div>
                        <button type="submit" className='user__ctreate-btn btn'>create</button>
                        <button type="button" className='user__ctreate-btn btn' onClick={() => setCreate(false)}>cancel</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default CreateForm;