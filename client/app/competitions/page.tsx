'use client'
import { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../global-provider'
import CompetitionCard from '../components/competition_card'
import CreateCompetition from '../components/create_competition'

export default function Competitions() {
	const [competitions, setCompetitions] = useState(null)
	const global = useContext(GlobalState)

	useEffect(() => {
		fetch('/api/competitions')
			.then((response) => response.json())
			.then((data) => {
				setCompetitions(data)
			})
	}, [global.state.profile])

	if (!global.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>
				You need to be signed in to access this page.
			</h1>
		)
	}

	return (
		<main>
			<CreateCompetition />
			<section className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-stretch'>
				{competitions &&
					competitions.map((competition) => {
						return <CompetitionCard key={competition.id} {...competition} />
					})}
			</section>
		</main>
	)
}
