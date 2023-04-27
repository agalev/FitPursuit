'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Callback() {
	const query = useSearchParams()
	const auth_code_regex = /(?<=code=).*.?(?=&scope)/
	const auth_code = query.toString().match(auth_code_regex)
	// const scope_regex = /(?<=scope=).*/
	// const scope = query.toString().match(scope_regex)
	let auth_tokens = {}
	let activities = []
	let page = 1

	useEffect(() => {
		fetch(
			`https://www.strava.com/oauth/token?client_id=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET}&code=${auth_code}&grant_type=authorization_code`,
			{
				method: 'POST'
			}
		)
			.then((res) => res.json())
			// .then((data) => console.log(data))
			.then(
				(data) =>
					(auth_tokens = {
						access_token: data.access_token,
						refresh_token: data.refresh_token
					})
			)
	}, [])

	const getActivities = () => {
		fetch(
			`https://www.strava.com/api/v3/athlete/activities?per_page=200&page=${page}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth_tokens.access_token}`
				}
			}
		)
			.then((res) => res.json())
			.then((data) => {
				data.forEach((activity) => {
					activities.push(activity)
				})
				if (data.length === 200) {
					page++
					getActivities()
				}
			})
			.finally(() => console.log(activities))
	}

	return (
		<main>
			<h1>FitPursuit</h1>
			<button onClick={getActivities}>Get Activities</button>
		</main>
	)
}
