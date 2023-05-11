import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function UsersTable() {
	const [users, setUsers] = useState(null)
	const [sortField, setSortField] = useState('')
	const [sortOrder, setSortOrder] = useState('asc')

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
				return (
					a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
						numeric: true
					}) * (sortOrder === 'asc' ? 1 : -1)
				)
			})
			setUsers(sorted)
		}
	}

	return (
		<section className='flex flex-col overflow-x-auto'>
			<h2 className='text-2xl my-2 font-bold text-center'>Users Leaderboard</h2>
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
					{users &&
						users.map((user) => (
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
									{user.team ? user.team.name : '-'}
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
