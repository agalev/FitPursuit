import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { initTE, Input, Ripple } from 'tw-elements'
import { GlobalState } from '../global-provider'

export default function UsersTable() {
	const global = useContext(GlobalState)
	const [users, setUsers] = useState(null)
	const [invited, setInvited] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [sortField, setSortField] = useState('')
	const [sortOrder, setSortOrder] = useState('asc')

	useEffect(() => {
		initTE({ Input, Ripple })
	}, [])

	let index = 1

	useEffect(() => {
		fetch('/api/users')
			.then((response) => response.json())
			.then((data) => setUsers(data))
	}, [])

	const sortTable = (category) => {
		const order = category === sortField && sortOrder === 'asc' ? 'desc' : 'asc'
		setSortField(category)
		setSortOrder(order)
		handleSorting(category, order)
	}

	const handleSorting = (sortField, sortOrder) => {
		if (sortField) {
			const sorted = [...users].sort((a, b) => {
				if (a[sortField] === null || b[sortField] === null) return 0
				return (
					a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
						numeric: true
					}) * (sortOrder === 'asc' ? 1 : -1)
				)
			})
			setUsers(sorted)
		}
	}

	const handleInvite = (selectedUser) => {
		fetch('/api/teams/leader', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: `${global.state.profile.first_name} ${global.state.profile.last_name} has invited ${selectedUser.first_name} ${selectedUser.last_name} to join ${global.state.profile.team.name}.`,
				receiver_id: selectedUser.id,
				invitation: true
			})
		}).then((res) => {
			if (res.ok) {
				setInvited([...invited, selectedUser.id])
				res.json().then((data) => {
					global.dispatch({
						type: 'TOAST',
						payload: {
							type: 'success',
							message: 'Invitation sent.'
						}
					})
				})
			} else {
				res.json().then((data) => {
					global.dispatch({
						type: 'TOAST',
						payload: {
							type: 'error',
							message: data.error
						}
					})
				})
			}
		})
	}

	const filteredUsers =
		users &&
		users.filter((user) => {
			return JSON.stringify(user)
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		})

	const displayUsers = searchQuery.length > 0 ? filteredUsers : users

	return (
		<section className='flex flex-col overflow-x-auto'>
			<h2 className='text-2xl my-2 font-bold text-center'>Users Leaderboard</h2>
			<div className='relative mb-3' data-te-input-wrapper-init>
				<input
					type='search'
					className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
					id='Search'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<label
					htmlFor='Search'
					className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'
				>
					Search
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 22 22'
						fill='currentColor'
						className='h-5 w-5 ml-1 inline-block'
					>
						<path
							fillRule='evenodd'
							d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
							clipRule='evenodd'
						/>
					</svg>
				</label>
			</div>
			<table className='min-w-full text-center text-sm font-light'>
				<thead className='border-b bg-amber-500 text-white font-medium dark:border-neutral-500'>
					<tr>
						<th scope='col' className='cursor-pointer py-4'>
							#
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('first_name')}
						>
							First Name
							{sortField === 'first_name' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('last_name')}
						>
							Last Name
							{sortField === 'last_name' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('sex')}
						>
							Gender
							{sortField === 'sex' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('wins')}
						>
							Wins
							{sortField === 'wins' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('team_id')}
						>
							Team
							{sortField === 'team_id' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('city')}
						>
							City
							{sortField === 'city' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('state')}
						>
							State
							{sortField === 'state' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('country')}
						>
							Country
							{sortField === 'country' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('last_online')}
						>
							Last Online
							{sortField === 'last_online' && sortOrder === 'asc' ? (
								<Image
									src='/arrow-up.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow up'
								/>
							) : (
								<Image
									src='/arrow-down.svg'
									width='0'
									height='0'
									sizes='100vw'
									className='w-6 h-auto inline-block'
									alt='arrow down'
								/>
							)}
						</th>
					</tr>
				</thead>
				<tbody>
					{displayUsers &&
						displayUsers.map((user) => (
							<tr key={user.id} className='border-b dark:border-neutral-500'>
								<td className='whitespace-nowrap px-6 py-4 font-medium'>
									{index++}
								</td>
								<td className='whitespace-nowrap px-8 py-4'>
									{user.first_name ? user.first_name : '-'}
								</td>
								<td className='whitespace-nowrap px-10 py-4'>
									{user.last_name ? user.last_name : '-'}
								</td>
								<td className='whitespace-nowrap px-10 py-4'>
									{user.sex ? user.sex : '-'}
								</td>
								<td className='whitespace-nowrap px-10 py-4'>{user.wins}</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{user.team ? (
										user.team.name
									) : global.state.profile.team &&
									  global.state.profile.team.leader_id ===
											global.state.profile.id && !invited.includes(user.id) ? (
										<button
											className='bg-sky-700 px-2 py-2 rounded-lg text-xs text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
											data-te-ripple-init
											data-te-ripple-color='light'
											onClick={() => handleInvite(user)}
										>
											invite to team
										</button>
									) : (
										'-'
									)}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{user.city ? user.city : '-'}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{user.state ? user.state : '-'}
								</td>
								<td className='whitespace-nowrap px-8 py-4'>
									{user.country ? user.country : '-'}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{user.last_online ? user.last_online : '-'}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	)
}
