'use client'
import { useState, useContext } from 'react'
import { GlobalState } from '../global-provider'
import UserProfile from '../components/user_profile'
import TeamDashboard from '../components/team_dashboard'
import ChartElement from '../components/chart'
import ActivitiesTable from '../components/activities_table'

export default function Dashboard() {
	const global = useContext(GlobalState)
	const [showChart, setShowChart] = useState(false)
	const [showTable, setShowTable] = useState(false)

	if (!global.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>
				You need to be signed in to access this page.
			</h1>
		)
	}

	return (
		<>
			<h1 className='flex justify-center text-3xl'>Profile</h1>
			<UserProfile />
			{global.state.profile.team && <TeamDashboard />}
			<div className='flex justify-center'>
				<button
					className={`inline-block px-2 m-1 w-32 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] ${
						showChart ? 'bg-emerald-900' : 'bg-gray-500'
					}`}
					onClick={() => setShowChart(!showChart)}
				>
					{showChart ? 'Hide Dynamic Chart' : 'Show Dynamic Chart'}
				</button>
				<button
					className={`inline-block px-2 m-1 w-32 bg-amber-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] ${
						showTable ? 'bg-emerald-900' : 'bg-gray-500'
					}`}
					onClick={() => setShowTable(!showTable)}
				>
					{showTable ? 'Hide Activities Table' : 'Show Activities Table'}
				</button>
			</div>
			{showChart && <ChartElement />}
			{showTable && <ActivitiesTable param='self' />}
		</>
	)
}
