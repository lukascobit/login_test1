import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState("")

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}