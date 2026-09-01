import { useEffect, useState } from 'react'
import type { User, LoginStatus } from '../../data/types'



export function UpdateUser (loginStatus: LoginStatus) {
    const [updateFormData, setUpdateFormData] = useState<User>({id: '', name: '', email: '', password: '', notes: []})

    const handleUpdateFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (loginStatus.user) {
            setUpdateFormData({
                ...updateFormData,
                id: loginStatus.user.id,
                name: loginStatus.user.name,
                [event.target.name]: event.target.value,
                notes: loginStatus.user.notes
            })
        }
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
                // Clear form data
                setUpdateFormData({id: '', name: '', email: '', password: '', notes: []});               
            } else {
                console.log('No user logged in')
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
        <div>
            <h2>Update User Info</h2>
            <form onSubmit={handleUpdate}>
                <label htmlFor='email'>Email: </label>
                <input type='text' name='email' value={updateFormData.email} id='email' onChange={handleUpdateFormChange} />
                <label htmlFor="password">Password: </label>
                <input type='text' name='password' value={updateFormData.password} id='password' onChange={handleUpdateFormChange} />
                <button type='submit'>Update User</button>
            </form>
        </div>   
        
        </>
    )
}

