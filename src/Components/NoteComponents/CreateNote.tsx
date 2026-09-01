import { useState } from "react";
import type { LoginStatus, Note, User } from "../../data/types";

export function CreateNote(loginStatus: LoginStatus) {
    const currentDate = new Date();

    const [formData, setFormData] = useState({title: '', content: '', creationDate: currentDate, tags: []})

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        setFormData({
                ...formData, 
                [event.target.name]: event.target.value
            }
         )
    }

    const handleCreateNote = async (event:React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            if (loginStatus.user)
                {
                const response = await fetch(`http://localhost:3001/users/${loginStatus.user.id}/notes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) {
                    throw new Error("Cannot respond to json file.");
                }
                // Clear form data
                setFormData({title: '', content: '', creationDate: currentDate, tags: []});
            } else {
                throw new Error("Cannot load user.");
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div>
                <h3>Create Note</h3>
                <form onSubmit={handleCreateNote}>
                    <label htmlFor="title">Title: </label>
                    <input name="title" value={formData.title} onChange={handleFormChange}></input>
                    <label htmlFor="content">Content: </label>
                    <input name="content" value={formData.content} onChange={handleFormChange}></input>
                    <label htmlFor="tags">Tags: </label>
                    <input name="tags" value={formData.tags[-1]} onChange={handleFormChange}></input>
                    <button type="submit">Create Note</button>
                </form>
            </div>
        </>
    );
}
