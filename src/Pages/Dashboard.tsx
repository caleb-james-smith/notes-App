import { useEffect, useState } from "react"
import type { LoginStatus, Note, User } from "../data/types"
import { Login } from "../Components/UserComponents/Login"
import { UpdateUser } from "../Components/UserComponents/UpdateUser"
import { NewUser } from "../Components/UserComponents/NewUser"
import { NoteList } from "../Components/NoteComponents/NoteList"
import { CreateNote } from "../Components/NoteComponents/CreateNote"
import { NoteSearch } from "../Components/NoteComponents/NoteSearch"

export function Dashboard () {

    const [createUser, setCreateUser] = useState<boolean>(false)

    const [loginStatus, setLoginStatus] = useState<LoginStatus>(
            {
                user: null,
                loginStatus: false
            }
    )

    const [allNotes, setAllNotes] = useState<Note[]>([]);

    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    const [searchTag, setSearchTag] = useState<string>('');

    const [isSwitch, setIsSwitch] = useState<boolean>(false);

    const createUserProp = (input: boolean):void  => {
        setCreateUser(input)
    }

    const updateLoginStatus = (input: LoginStatus):void => {
        setLoginStatus(input)
    }

    async function getNotes(): Promise<void> {
        try {
            const response = await fetch("http://localhost:3001/notes");
            if (!response.ok) {
                throw new Error("Unable to load notes")
            }
            const data = await response.json();
            setAllNotes(data);
        } catch (error) {
            console.error(error)
        }
    }

    function updateFilteredNotes(notes: Note[], user: User): void {        
        if (loginStatus.user && loginStatus.loginStatus) {
            
            const userNotes = notes.filter((note) => (note.userId === user.id.toString()));
            
            setFilteredNotes(userNotes);
        }
        if (searchTag) {
            const taggedNotes: Note[] = [];
            for (const note of filteredNotes) {
                if (note.tags) {
                    for (const tag of note.tags) {
                        if (tag.includes(searchTag))
                            taggedNotes.push(note);
                    }
                }
            }
            setFilteredNotes(taggedNotes);
        }
    }

    function toggleSwitch() {
        if (isSwitch) {
            setIsSwitch(false)
        } else {
            setIsSwitch(true)
        }
    }

    function handleSetTagSearch (input: string): void {
        setSearchTag(input)
    }

    useEffect(() => {
        getNotes();
            }, [loginStatus, isSwitch, searchTag]);

    useEffect(() => {
        if (loginStatus.user && allNotes) {
            updateFilteredNotes(allNotes, loginStatus.user);
        }
    }, [allNotes]);

    useEffect(() => {
        console.log('useEffect after tag search change.');
        if (loginStatus.user) {
            updateFilteredNotes(allNotes, loginStatus.user);
        }
        console.log("filteredNotes:", filteredNotes);
    }, [searchTag]);


    function renderDashboard () {
        if(loginStatus.loginStatus) {
            return (
            <>
                <UpdateUser { ...loginStatus } />
                <CreateNote loginStatus={loginStatus} toggleSwitch={toggleSwitch} />
                <NoteSearch handleSetTagSearch={handleSetTagSearch} />
                <NoteList loginStatus={loginStatus} allNotes={allNotes} filteredNotes={filteredNotes} getNotes={getNotes} updateFilteredNotes={updateFilteredNotes} />
            </>
        );
        } else {
            if (createUser) {
                return <NewUser 
                    createUser={createUser}
                    createUserProp={createUserProp}
                />
            } else {
                return (
                    <Login
                        createUser={createUser}
                        loginStatus={loginStatus}
                        updateLoginStatus={updateLoginStatus}
                        createUserProp={createUserProp}                        
                    />
                )
            }
        }   
    }

    return (
        <>
            <div>
                {renderDashboard()}
            </div>            
        </>
    )
}