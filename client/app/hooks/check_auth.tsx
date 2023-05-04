'use client'
import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { UserContext } from '../user-provider'

export default function checkAuth() {
	const userData = useContext(UserContext)
	const session: any = useSession()

	useEffect(() => {
		if (session.data && !userData.state.isLoggedIn) {
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
			}).finally(() => {
				userData.dispatch({ type: 'LOGIN' })
			})
		} else if (!userData.state.isLoggedIn) {
			fetch('/api/auth').then((res) => {
				if (res.status === 200) {
					userData.dispatch({ type: 'LOGIN' })
				}
			})
		}
	}, [session])
}
