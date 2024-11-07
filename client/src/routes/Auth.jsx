/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
// import { Auth0Provider } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';

const Auth = () => {
    const initValues = {
        username: '',
        userpassword: ''
    } 
    const [user, setUser] = useState(initValues)
    const [newUser, setNewUser] = useState(true)
    const {  getAccessTokenSilently } = useAuth0();

    const createUserMetadata = async (user) => {
        const { email, name, picture } = user;
        
    
        try {
            const response = await fetch('http://localhost:8080/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await getAccessTokenSilently()}`, 
                },
                body: JSON.stringify({
                    userEmail: email,
                    userName: name,
                    userProfilePicture: picture, 
                }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                console.error('Error creating or checking user metadata:', data.error);
            } else {
                console.log('User metadata:', data);
            }
        } catch (error) {
            console.error('Error during check or create user metadata request:', error);
        }
    };
    
    const toggle = () => {
        setNewUser(prevStatus => !prevStatus)
    } 
    const handleChange = (e) => {
        const {name, value} = e.target
        setUser
    } 
    const handleSignUp = (e) => {
        e.preventDefault()
        createUserMetadata()
        console.log('user created!')
        // signup
    }
    const handleLogin = (e) => {
        e.preventDefault()
        createUserMetadata()
        console.log('user created!')
        // login
    }
    
    useEffect(()=> {

    }, [])

    return (
        <>
            {newUser
                ?
            <form onSubmit={handleSignUp}>
                <input 
                type="text" 
                value={user[username]}
                name='username'
                placeholder="Username..."
                onChange={handleChange}
                />
                <input 
                type="text" 
                value={user[userpassword]}
                name='password'
                placeholder="Pasword..."
                onChange={handleChange}
                />
                <button>Sign Up</button>
                <p onClick={toggle()}>Already signed up?</p>
            </form>
            :
            <form onSubmit={handleLogin}>
                <input 
                type="text" 
                value={user[username]}
                name='username'
                placeholder="Username..."
                onChange={handleChange}
                />
                <input 
                type="text" 
                value={user[password]}
                name='password'
                placeholder="Pasword..."
                onChange={handleChange}
                />
                <button>Sign In</button>
                <p onClick={toggle()}>Not signed up yet?</p>
            </form>
            }
        </>
    )
}
export {Auth}