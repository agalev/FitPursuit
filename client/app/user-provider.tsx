'use client'
import { createContext, useReducer } from 'react'

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'LOGIN':
				return {
					isLoggedIn: true
				}
			case 'LOGOUT':
				return {
					isLoggedIn: false
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		isLoggedIn: false
	})

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }