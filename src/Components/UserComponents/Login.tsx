import { useEffect, useState } from 'react'
import type { User, LoginStatus } from '../../data/types'



export function Login () {

    const [loginFormData, setLoginFormData] = useState({email: '', password: ''})
    const [updateFormData, setUpdateFormData] = useState({email: '', password: ''})
    const [loginStatus, setLoginStatus] = useState<LoginStatus>(
        {
            user: null,
            loginStatus: false
        }
    )
    
    const handleLoginFormChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        setLoginFormData({
            ...loginFormData, 
            [event.target.name]: event.target.value
            }
         )
    }
    const handleUpdateFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateFormData({
            ...updateFormData,
            [event.target.name]: event.target.value
        })
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
                setLoginStatus({
                    user: user,
                    loginStatus: true
                })  
                console.log(loginStatus)
            } else {
                console.log('invalid password')
            }  
            console.log(loginStatus)         

        } catch (error) {
            console.error(error)

        }
    } 

    const handleLogout = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        setLoginStatus(
            {
            user: null,
            loginStatus: false
        }
        )
        console.log(loginStatus)
    }

    const handleUpdate = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            if (loginStatus.user){
                const response = await fetch(`http://localhost:3001/users/${loginStatus.user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateFormData)
                })
                if(!response.ok) {
                    throw new Error ('Network response failed')
                }               
            } else {
                console.log('No user logged in')
            }
        } catch (error) {
            console.error(error)
        }

    }

    useEffect (() => {
        console.log('useEffect:', loginStatus)
    },[loginStatus])

    
    


    return (
        <>
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email: </label>
                <input type="text" name="email" id="email" onChange={handleLoginFormChange} />
                <label htmlFor='password'>Password: </label>
                <input type='text' name='password' id="password" onChange={handleLoginFormChange} />
                <button type='submit'>Login</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div>
            <form onSubmit={handleUpdate}>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' id='email' onChange={handleUpdateFormChange} />
                <label htmlFor="password">Password: </label>
                <input type='text' name='password' id='password' onChange={handleUpdateFormChange} />

                <button type='submit'>Update User</button>
            </form>

        </div>
        </>
    )
}