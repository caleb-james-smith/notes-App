import {} from "../../data/types";
import  { useState } from 'react'

export function NewUser () {

    const [formData, setFormData] = useState({name: '', email: '', password: ''})

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value
            }
         )
    }

    const handleNewUser = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try{
            const response = await fetch(`http://localhost:3001/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                throw new Error('cannot respond to json file')
            }
            // Clear form data
            setFormData({name: '', email: '', password: ''});

        } catch (error) {
            console.error(error)

        }

    }

    return (
        <>
        <div>
            <h2>New User Sign Up</h2>
            <form onSubmit={handleNewUser}>
                <label htmlFor="name">Name: </label>
                <input name="name" value={formData.name} onChange={handleFormChange}></input>
                <label htmlFor="email">Email: </label>
                <input name='email' value={formData.email} onChange={handleFormChange}></input>
                <label htmlFor="password">New Password: </label>
                <input name='password' value={formData.password} onChange={handleFormChange}></input>
                <button type="submit">New User</button>
            </form>
        </div>        
        </>
    )
}