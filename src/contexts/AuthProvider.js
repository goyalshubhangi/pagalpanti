import { createContext, useContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { auth } from "../utils/firebase"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    const signUp = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const logIn = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const logOut = () => {
        return signOut(auth)
    }

    const updateUserName = (name) => {
        return updateProfile(auth.currentUser, { displayName: name })
    }

    useEffect(() => {
        const hogyaKaam = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })

        return hogyaKaam
    }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        updateUserName,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
