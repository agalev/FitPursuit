'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Callback() {
	const query = useSearchParams()
	const auth_code_regex = /(?<=code=).*.?(?=&scope)/
	const auth_code = query.toString().match(auth_code_regex)
	// const scope_regex = /(?<=scope=).*/
	// const scope = query.toString().match(scope_regex)
	let tokens = {}
	useEffect(() => {
		fetch(
			`https://www.strava.com/oauth/token?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET}&code=${auth_code}&grant_type=authorization_code`,
			{
				method: 'POST'
			}
		)
			.then((res) => res.json())
			// .then((data) => console.log(data))
			.then((data) => tokens = data)
			.then(() => console.log(tokens))
	}, [])
	return (
		<main>
			<h1>FitPursuit</h1>
		</main>
	)
}
