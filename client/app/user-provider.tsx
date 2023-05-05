'use client'
import { useEffect, createContext, useReducer } from 'react'
import Toaster from './components/toast'

const UserContext = createContext(null)

const UserProvider = ({ children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'LOGIN':
				return {
					...state,
					isLoggedIn: true,
					toast: {
						message: 'Logged in.',
						type: 'success'
					}
				}
			case 'LOGOUT':
				return {
					...state,
					isLoggedIn: false,
					toast: {
						message: 'Logged out.',
						type: 'success'
					}
				}
			case 'TOAST':
				return {
					...state,
					toast: {
						message: action.payload.message,
						type: action.payload.type
					}
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		isLoggedIn: false,
		toast: {
			message: '',
			type: ''
		}
	})

	useEffect(() => {
		const disappearance = setTimeout(() => {
			dispatch({ type: 'TOAST', payload: { message: '', type: '' } })
		}, 5000)
		return () => {
			clearTimeout(disappearance)
		}
	}, [state.toast.message])

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{state.toast.message && (
				<Toaster message={state.toast.message} type={state.toast.type} />
			)}
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
