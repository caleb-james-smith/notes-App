import { useEffect, useState } from "react";
import type { CreateNoteProps, LoginStatus, Note, User } from "../../data/types";

export function CreateNote({loginStatus, toggleSwitch}: CreateNoteProps) {
    const currentDate = new Date();

    const [formData, setFormData] = useState({title: '', content: '', creationDate: currentDate, tags: ''})

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) =>  {
        setFormData({
                ...formData, 
                [event.target.name]: event.target.value                
            }
         )
    }

    const handleTagConvert = () => {
        const tempTags = formData.tags
        const tagsArr = tempTags.split('#')
        console.log('form Data', formData)
        console.log(tagsArr)
        const convertForm = {
            title: formData.title,
            content: formData.content,
            creationDate: formData.creationDate,
            tags: tagsArr
        }
        return convertForm
    }
    

    const handleCreateNote = async (event:React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const convertForm = handleTagConvert();
        try {
            if (loginStatus.user)
                {
                const response = await fetch(`http://localhost:3001/users/${loginStatus.user.id}/notes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(convertForm)
                });
                if (!response.ok) {
                    throw new Error("Cannot respond to json file.");
                }
                setFormData({title: '', content: '', creationDate: currentDate, tags: ''});
                toggleSwitch()
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
                    <input name="tags" value={formData.tags} onChange={handleFormChange}></input>
                    <button type="submit">Create Note</button>
                </form>
            </div>
        </>
    );
}
