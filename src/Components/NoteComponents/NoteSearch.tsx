import { useState } from "react";
import type { NoteSearchProps } from "../../data/types";



export function NoteSearch ({handleSetTagSearch}: NoteSearchProps) {

    const [formData, setFormData] = useState<string>('')

    const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
        event.preventDefault()
        handleSetTagSearch(formData)
    }

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(event.target.value)
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="tagSearch">Search By Tag: </label>
                <input id="tagSearch" name="tagSearch" value={formData} onChange={handleFormChange} />
                <button type="submit">Search</button>
            </form>        
        </>
    )
}