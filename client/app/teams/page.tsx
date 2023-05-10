'use client'
import { useContext } from 'react'
import { GlobalState } from '../global-provider'
import TeamsTable from '../components/teams_table'

export default function Teams() {
	const global = useContext(GlobalState)

	return (
		<>
			<TeamsTable />
		</>
	)
}
