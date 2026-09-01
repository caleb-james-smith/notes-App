export interface User  {
    id: string
    name: string
    email: string
    password: string
    notes: Note[]    
}

export interface Note {
    id: string
    title: string
    content: string
    creationDate: Date | null
    tags?: string[]
    userId: string
}

export type NewUserForm = {
    name: string
    email: string
    password: string
}

export type LoginStatus = {
    user: User | null
    loginStatus: boolean
}

export interface NoteListProps {
    loginStatus: LoginStatus
    allNotes: Note[]
    filteredNotes: Note[]
    getNotes: () => void
    updateFilteredNotes: (notes: Note[], user: User) => void
}


// using Classes to keep the data types

// class User  {   
//         id: string;
//         name: string;
//         email: string;
//         password: string;
//         notes: Note[]
//         constructor(id: string, name: string, email: string, password: string, notes: Note[]) {
//             this.id = id;
//             this.name = name
//             this.email = email
//             this.password = password
//             this.notes = notes
//         }    
//     }

// class Note {
//     id: string
//     title: string
//     content: string
//     creationDate: Date
//     tags?: string[]
//         constructor(id: string, title: string, content: string, creationDate: Date, tags?: string[]) {
//             this.id = id
//             this.title = title
//             this.content = content
//             this.creationDate = creationDate
//             this.tags = tags // come back to this and see if we need a conditional
//         }
// }

