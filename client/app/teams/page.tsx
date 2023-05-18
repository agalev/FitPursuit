'use client'
import { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../global-provider'
import CreateTeam from '../components/create_team'
import TeamCard from '../components/team_card'

export default function Teams() {
	const [teams, setTeams] = useState(null)
	const global = useContext(GlobalState)

	useEffect(() => {
		fetch('/api/teams')
			.then((response) => response.json())
			.then((data) => setTeams(data))
	}, [])

	if (!global.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>
				You need to be signed in to access this page.
			</h1>
		)
	}

	return (
		<main>
			{!global.state.profile.team && <CreateTeam />}
			<section className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-stretch'>
				{teams && teams.map((team) => <TeamCard key={team.id} {...team} />)}
			</section>
		</main>
	)
}
