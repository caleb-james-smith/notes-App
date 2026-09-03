import { useState } from "react"
import type { EditNoteProps, Note } from "../../data/types"





export function EditNote ({note, changeEditState}: EditNoteProps) {

    const [updateFormData, setUpdateFormData] = useState<Note>({
        id: note.id, title: note.title, content: note.content, creationDate: note.creationDate, tags: note.tags, userId: note.userId
        }        
    )

    const handleUpdateFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateFormData(
            {
                ...updateFormData,
                [event.target.name]: event.target.value,
            }
        )
    }

    const handleEditNote = async (event: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            if (note) {
                const response = await fetch (`http://localhost:3001/notes/${note.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateFormData)
                    })
                if (!response.ok) {
                    throw new Error ('Network response failed')
                }
                changeEditState()                
            } else {
                throw new Error ('No note availible')
            }
        } catch (error) {
            console.error(error)
        }
    }




    return (
        <>
            <div>
                <form onSubmit={handleEditNote}>
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" value={updateFormData.title} id="title" onChange={handleUpdateFormChange} />
                    <label htmlFor="title">Content: </label>
                    <input type="text" name="title" value={updateFormData.content} id="title" onChange={handleUpdateFormChange} />
                    <button type="submit">Edit Note</button>
                </form>
            </div>

        </>
    )
}