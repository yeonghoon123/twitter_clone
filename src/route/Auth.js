import React, { useState } from 'react';

export default () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === 'email')
            setUserEmail(value);
        else
            setUserPassword(value);
    }
    return (
        <div>
            <form>
                <input name='email' placeholder='Email' value={userEmail} onChange={event => onChange(event)} required />
                <input name='password' type="password" placeholder='Password' value={userPassword} onChange={event => onChange(event)} required />
                <input type="submit" value="LOGIN" />
            </form>
            <button>Google</button>
            <button>Github</button>
        </div>
    )
}