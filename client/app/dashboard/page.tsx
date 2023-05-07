'use client'
import { useEffect, useContext } from 'react'
import { Ripple, Input, initTE } from 'tw-elements'
import { GlobalState } from '../global-provider'
import ChartElement from '../components/chart'
// import ActivityTable from '../components/activity_table'

export default function Dashboard() {
	const global = useContext(GlobalState)

	useEffect(() => {
		initTE({ Ripple, Input })
	}, [])

	if (!global.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>
				You need to be signed in to access this page.
			</h1>
		)
	}

	return (
		<>
			<h1>Dashboard</h1>
			<ChartElement />
		</>
	)
}
