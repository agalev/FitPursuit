'use client'
import { useContext } from 'react'
import { GlobalState } from '../global-provider'
import CreateTeam from '../components/create_team'

export default function Teams() {
	const global = useContext(GlobalState)

	if (!global.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>
				You need to be signed in to access this page.
			</h1>
		)
	}

	return <main>{!global.state.profile.team && <CreateTeam />}</main>
}
