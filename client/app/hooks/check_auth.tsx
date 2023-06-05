'use client'
import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { GlobalState } from '../global-provider'

export default function CheckAuth() {
	const global = useContext(GlobalState)
	const session: any = useSession()

	useEffect(() => {
		if (session.data && !global.state.isLoggedIn) {
			fetch('/api/auth', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...session.data.profile,
					accessToken: session.data.accessToken,
					refreshToken: session.data.refreshToken,
					expires_at: session.data.expires
				})
			}).then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						global.dispatch({ type: 'LOGIN', payload: data.profile })
					})
				} else {
					res.json().then((error) => {
						global.dispatch({
							type: 'TOAST',
							payload: { message: error.error, type: 'error' }
						})
					})
				}
			})
		} else if (!global.state.isLoggedIn) {
			fetch('/api/auth').then((res) => {
				if (res.status === 200 || res.status === 201) {
					res.json().then((data) => {
						global.dispatch({ type: 'LOGIN', payload: data.profile })
					})
				}
			})
		} else if (
			session.data &&
			session.data.profile.id !== global.state.profile.id
		) {
			fetch('/api/auth', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...session.data.profile,
					accessToken: session.data.accessToken,
					refreshToken: session.data.refreshToken,
					expires_at: session.data.expires
				})
			}).then((res) => {
				if (res.status === 200) {
					res.json().then((data) => {
						global.dispatch({ type: 'LOGIN', payload: data.profile })
					})
				} else {
					res.json().then((error) => {
						global.dispatch({
							type: 'TOAST',
							payload: { message: error.error, type: 'error' }
						})
					})
				}
			})
		}
	}, [session, global])
}
