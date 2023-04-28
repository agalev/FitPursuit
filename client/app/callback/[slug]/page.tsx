'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Callback() {
	const router = useRouter()
	const query = useSearchParams()
	const auth_code_regex = /(?<=code=).*.?(?=&scope)/
	const auth_code = query.toString().match(auth_code_regex)

	useEffect(() => {
		fetch(
			`https://www.strava.com/oauth/token?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET}&code=${auth_code}&grant_type=authorization_code`,
			{
				method: 'POST'
			}
		)
			.then((res) => res.json())
			.then((data) => {
				try {
					console.log(data)
					fetch('/api/strava_auth', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					})
				} catch (err) {
					console.log(err)
				}
			})
			.finally(() => {
				router.push('/')
			})
	}, [])
}
