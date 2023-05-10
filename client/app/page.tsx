'use client'
import { useState, useEffect, useContext } from 'react'
import { initTE, Ripple } from 'tw-elements'
import { GlobalState } from './global-provider'
import CTA from './components/call_to_action'
import UsersTable from './components/users_table'
import TeamsTable from './components/teams_table'

export default function Home() {
	const global = useContext(GlobalState)
	const [activeTab, setActiveTab] = useState('users')

	useEffect(() => {
		initTE({ Ripple })
	}, [])

	if (!global.state.isLoggedIn) return <CTA />

	return (
		<main>
				<h1 className='flex justify-center text-3xl'>Browse the ranks</h1>
			<div className='flex justify-center '>
				<div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
					<input
						className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-warning checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-warning checked:after:bg-warning checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-warning checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-warning dark:checked:after:border-warning dark:checked:after:bg-warning dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-warning dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
						type='radio'
						id='inlineRadio1'
						value='users'
						checked={activeTab === 'users'}
						onClick={() => setActiveTab('users')}
					/>
					<label
						className='mt-px inline-block pl-[0.15rem] hover:cursor-pointer'
						htmlFor='inlineRadio1'
					>
						Show Users
					</label>
				</div>
				<div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
					<input
						className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-warning checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-warning checked:after:bg-warning checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-warning checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-warning dark:checked:after:border-warning dark:checked:after:bg-warning dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-warning dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
						type='radio'
						id='inlineRadio2'
						value='teams'
						checked={activeTab === 'teams'}
						onClick={() => setActiveTab('teams')}
					/>
					<label
						className='mt-px inline-block pl-[0.15rem] hover:cursor-pointer'
						htmlFor='inlineRadio2'
					>
						Show Teams
					</label>
				</div>
			</div>
			{activeTab === 'users' && <UsersTable />}
			{activeTab === 'teams' && <TeamsTable />}
		</main>
	)
}
