import { useState } from "react"
import type { LoginStatus, User } from "../data/types"
import { Login } from "../Components/UserComponents/Login"
import { UpdateUser } from "../Components/UserComponents/UpdateUser"
import { NewUser } from "../Components/UserComponents/NewUser"

export function Dashboard () {

    const [createUser, setCreateUser] = useState<boolean>(false)

    const [loginStatus, setLoginStatus] = useState<LoginStatus>(
            {
                user: null,
                loginStatus: false
            }
        )

    const createUserProp = (input: boolean):void  => {
        setCreateUser(input)


    }   
    const updateLoginStatus = (input: LoginStatus):void => {
        setLoginStatus(input)
    }



    function renderDashboard () {
        if(loginStatus.loginStatus) {
            return <UpdateUser { ...loginStatus } />
        } else {
            if (createUser) {
                return <NewUser />
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