'use client'
import { useEffect, useContext } from 'react'
import { Ripple, Input, initTE } from 'tw-elements'
import { GlobalState } from './global-provider'

export default function Home() {
	const global = useContext(GlobalState)

	useEffect(() => {
		initTE({ Ripple, Input })
	}, [])

	const getAuth = () => {
		fetch('/api/auth').then((res) => {
			if (res.status === 200) {
				res.json().then((data) => {
					global.dispatch({
						type: 'TOAST',
						payload: { message: JSON.stringify(data), type: 'info' }
					})
				})
			} else {
				global.dispatch({
					type: 'TOAST',
					payload: { message: `${res.status}: No session found`, type: 'info' }
				})
			}
		})
	}

	return (
		<main>
			<button
				type='button'
				data-te-ripple-init
				data-te-ripple-color='light'
				className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
				onClick={getAuth}
			>
				Console log session user
			</button>
		</main>
	)
}
