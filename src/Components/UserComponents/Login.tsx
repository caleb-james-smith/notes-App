import { useState } from 'react'
import type { User, LoginStatus } from '../../data/types'



export function Login ({loginStatus, updateLoginStatus, createUser, createUserProp}: {loginStatus: LoginStatus, updateLoginStatus:(input: LoginStatus) => void, createUser: boolean, createUserProp:(input: boolean) => void} ) {

    const [loginFormData, setLoginFormData] = useState({email: '', password: ''})  

    const handleLoginFormChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        setLoginFormData({
            ...loginFormData, 
            [event.target.name]: event.target.value
            }
         )
    }

    const handleLogin = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:3001/users')
            if(!response.ok) {
                throw new Error('Network response failed')
            }
            const data = await response.json()
            const user = data.find((u: User) => u.email === event.target.email.value)
            
            if (user && user.password === event.target.password.value ) {
                updateLoginStatus({
                    user: user,
                    loginStatus: true
                })
            } else {
                console.log('invalid password or email')
            }        

        } catch (error) {
            console.error(error)

        }
    } 

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        updateLoginStatus(
            {
            user: null,
            loginStatus: false
        }
        )
        console.log(loginStatus)
    }

    const handleCreateUserButton = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        if (createUser) {
            createUserProp(false)
        } else {
            createUserProp(true)
        }
    }

    return (
        <>
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" id="email" onChange={handleLoginFormChange} />
                <label htmlFor='password'>Password: </label>
                <input type='text' name='password' id="password" onChange={handleLoginFormChange} />
                <button type='submit'>Login</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <button onClick={handleCreateUserButton}>Create User</button>
        </>
    )
}