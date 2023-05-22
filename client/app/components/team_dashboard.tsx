'use client'
import { useState, useEffect, useContext } from 'react'
import { initTE, Input, Select } from 'tw-elements'
import { GlobalState } from '../global-provider'

export default function TeamDashboard() {
	const global = useContext(GlobalState)

	const [team, setTeam] = useState(null)
	const [editMode, setEditMode] = useState(false)
	const [formData, setFormData] = useState({
		name: global.state.profile.team.name,
		activity_type: global.state.profile.team.activity_type,
		image: global.state.profile.team.image || ''
	})

	useEffect(() => {
		fetch(`/api/teams/${global.state.profile.team.id}`)
			.then((res) => res.json())
			.then((data) => {
				setTeam(data)
			})
		initTE({ Input, Select })
	}, [editMode])

	const convertSecondsToHours = (seconds) => {
		const hours = Math.floor(seconds / 3600)
		const remainingMinutes = Math.floor((seconds % 3600) / 60)
		const remainingSeconds = (seconds % 3600) % 60
		return hours > 0
			? `${hours}h ${remainingMinutes}m ${remainingSeconds}s`
			: `${remainingMinutes}m ${remainingSeconds}s`
	}

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleFormSubmit = () => {
		fetch('/api/teams', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: team.id, ...formData })
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					global.dispatch({ type: 'REFRESH_TEAM', payload: data })
					global.dispatch({
						type: 'TOAST',
						payload: { message: 'Team edited successfully', type: 'success' }
					})
					setTeam(data)
					setEditMode(false)
				})
			} else {
				res.json().then((error) => {
					global.dispatch({
						type: 'TOAST',
						payload: { message: error.error, type: 'error' }
					})
				})
			}
		})
	}

	const handleCancel = () => {
		setEditMode(false)
		setFormData({
			name: team.name,
			activity_type: team.activity_type,
			image: team.image
		})
	}

	const handleKick = (id) => {
		fetch('/api/teams/leader', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(id)
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					setTeam(data)
					global.dispatch({
						type: 'TOAST',
						payload: {
							message: 'User has been removed from the team.',
							type: 'success'
						}
					})
				})
			} else {
				res.json().then((error) => {
					global.dispatch({
						type: 'TOAST',
						payload: { message: error.error, type: 'error' }
					})
				})
			}
		})
	}

	const handleLeave = () => {
		fetch('/api/teams/leave', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					global.dispatch({ type: 'REFRESH', payload: data })
					global.dispatch({
						type: 'TOAST',
						payload: { message: 'Left team successfully.', type: 'success' }
					})
				})
			} else {
				res.json().then((error) => {
					global.dispatch({
						type: 'TOAST',
						payload: { message: error.error, type: 'error' }
					})
				})
			}
		})
	}

	const handleDisband = () => {
		fetch('/api/teams', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: global.state.profile.team.id })
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					global.dispatch({ type: 'REFRESH', payload: data })
					global.dispatch({
						type: 'TOAST',
						payload: {
							message: 'Team disbanded successfully.',
							type: 'success'
						}
					})
				})
			} else {
				res.json().then((error) => {
					global.dispatch({
						type: 'TOAST',
						payload: { message: error.error, type: 'error' }
					})
				})
			}
		})
	}

	return (
		team && (
			<section className='text-center m-2 p-1 rounded-lg border border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'>
				<h2 className='text-2xl mb-2'>Team Dashboard</h2>
				<div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
					<div>
						{editMode ? (
							<>
								<div className='relative mb-2' data-te-input-wrapper-init>
									<input
										className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
										type='text'
										name='name'
										value={formData.name}
										onChange={handleInputChange}
									/>
									<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
										Team Name
									</label>
								</div>
								<div className='relative mb-2' data-te-input-wrapper-init>
									<input
										className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
										type='text'
										name='activity_type'
										value={formData.activity_type}
										onChange={handleInputChange}
									/>
									<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
										Activity
									</label>
								</div>
								<div className='relative mb-2' data-te-input-wrapper-init>
									<input
										className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
										type='text'
										name='image'
										value={formData.image}
										onChange={handleInputChange}
									/>
									<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
										Image
									</label>
								</div>
							</>
						) : (
							<>
								<h3 className='text-xl font-medium'>{team.name}</h3>
								<h4 className='text-lg font-medium'>{team.activity_type}</h4>
								<img
									className='w-32 h-32 rounded-full my-2 mx-auto border-2 border-amber-500 shadow-2xl'
									src={team.image || '/avatar.jpg'}
									alt='avatar'
								/>
								{team.leader_id === global.state.profile.id ? (
									<button
										className='bg-red-500 m-1 px-1 py-1 rounded-lg text-xs text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
										onClick={handleDisband}
									>
										Disband Team
									</button>
								) : (
									<button
										className='bg-red-500 m-1 px-1 py-1 rounded-lg text-xs text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
										onClick={handleLeave}
									>
										Leave Team
									</button>
								)}
							</>
						)}
					</div>
					<div>
						<h3 className='text-lg font-medium'>Stats</h3>
						<p>Team Wins: {team.wins}</p>
						<p>
							Distance:{' '}
							{team.total_distance
								? `${Math.round(team.total_distance * 100) / 100} miles`
								: '-'}
						</p>
						<p>
							Moving Time:{' '}
							{team.total_moving_time
								? convertSecondsToHours(team.total_moving_time)
								: '-'}
						</p>
						<p>
							Avg Speed:{' '}
							{team.average_speed
								? `${Math.round(team.average_speed * 100) / 100} mph`
								: '-'}
						</p>
						<p>
							Max Speed:{' '}
							{team.max_speed
								? `${Math.round(team.max_speed * 100) / 100} mph`
								: '-'}
						</p>
					</div>
					<div>
						<h3 className='text-lg font-medium'>Members</h3>
						<ul>
							<li className='font-semibold'>
								Leader: {team.leader.first_name} {team.leader.last_name}
							</li>
							{team.users.map(
								(user) =>
									user.id !== team.leader.id && (
										<li key={user.id}>
											{user.first_name} {user.last_name}
											{global.state.profile.id === team.leader_id && (
												<button
													className='bg-red-500 m-1 px-1 py-1 rounded-lg text-xs text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
													onClick={() => handleKick(user.id)}
												>
													Kick
												</button>
											)}
										</li>
									)
							)}
						</ul>
					</div>
				</div>
				{editMode ? (
					<>
						<button
							className='inline-block px-2 w-48 bg-red-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
							onClick={handleCancel}
						>
							Cancel Edit
						</button>
						<button
							className='inline-block px-2 w-48 bg-green-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
							onClick={handleFormSubmit}
						>
							Submit
						</button>
					</>
				) : (
					<button
						className='inline-block px-2 w-48 bg-amber-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
						onClick={() => setEditMode(true)}
					>
						Edit Team Details
					</button>
				)}
			</section>
		)
	)
}
