'use client'
import { useEffect, createContext, useReducer } from 'react'
import Toaster from './components/toast'

const GlobalState = createContext(null)

const DispatchProvider = ({ children }) => {
	const reducer = (state, action) => {
		switch (action.type) {
			case 'LOGIN':
				return {
					...state,
					isLoggedIn: true,
					profile: action.payload,
					toast: {
						message: 'Logged in.',
						type: 'success'
					}
				}
			case 'LOGOUT':
				return {
					...state,
					isLoggedIn: false,
					profile: {},
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
			case 'REFRESH':
				return {
					...state,
					profile: action.payload
				}
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, {
		isLoggedIn: false,
		profile: {},
		toast: {
			message: '',
			type: ''
		}
	})

	useEffect(() => {
		const disappearance = setTimeout(() => {
			dispatch({ type: 'TOAST', payload: { message: '', type: '' } })
		}, 5000)
		console.log(state)
		return () => {
			clearTimeout(disappearance)
		}
	}, [state.toast.message])

	return (
		<GlobalState.Provider value={{ state, dispatch }}>
			{state.toast.message && (
				<Toaster message={state.toast.message} type={state.toast.type} />
			)}
			{children}
		</GlobalState.Provider>
	)
}

export { GlobalState, DispatchProvider }
