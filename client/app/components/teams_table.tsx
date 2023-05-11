import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function TeamsTable() {
	const [teams, setTeams] = useState(null)
	const [sortField, setSortField] = useState('')
	const [sortOrder, setSortOrder] = useState('asc')

	let index = 1

	useEffect(() => {
		fetch('/api/teams')
			.then((response) => response.json())
			.then((data) => setTeams(data))
	}, [])

	const sortTable = (category) => {
		const order = category === sortField && sortOrder === 'asc' ? 'desc' : 'asc'
		setSortField(category)
		setSortOrder(order)
		handleSorting(category, order)
	}

	const handleSorting = (sortField, sortOrder) => {
		if (sortField) {
			const sorted = [...teams].sort((a, b) => {
				return (
					a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
						numeric: true
					}) * (sortOrder === 'asc' ? 1 : -1)
				)
			})
			setTeams(sorted)
		}
	}

	return (
		<section className='flex flex-col overflow-x-auto'>
			<h2 className='text-2xl my-2 font-bold text-center'>Teams Leaderboard</h2>
			<table className='min-w-full text-center text-sm font-light'>
				<thead className='border-b bg-amber-500 text-white font-medium dark:border-neutral-500'>
					<tr>
						<th scope='col' className='cursor-pointer py-4'>
							#
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('name')}
						>
							Name
							{sortField === 'name' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('activity_type')}
						>
							Activity
							{sortField === 'activity_type' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('members')}
						>
							Members
							{sortField === 'members' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('leader_id')}
						>
							Leader
							{sortField === 'leader_id' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('average_speed')}
						>
							Avg Speed
							{sortField === 'average_speed' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('max_speed')}
						>
							Max Speed
							{sortField === 'max_speed' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('total_moving_time')}
						>
							Total Moving Time
							{sortField === 'total_moving_time' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('total_distance')}
						>
							Total Distance
							{sortField === 'total_distance' && sortOrder === 'asc' ? (
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
					{teams &&
						teams.map((team) => (
							<tr key={team.id} className='border-b dark:border-neutral-500'>
								<td className='whitespace-nowrap px-6 py-4 font-medium'>
									{index++}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>{team.name}</td>
								<td className='whitespace-nowrap px-10 py-4'>{team.wins}</td>
								<td className='whitespace-nowrap px-10 py-4'>
									{team.activity_type}
								</td>
								<td className='whitespace-nowrap px-12 py-4'>{team.members}</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{`${team.leader.first_name} ${team.leader.last_name}`}
								</td>
								<td className='whitespace-nowrap px-12 py-4'>
									{team.average_speed ? team.average_speed : '-'}
								</td>
								<td className='whitespace-nowrap px-12 py-4'>
									{team.max_speed ? team.max_speed : '-'}
								</td>
								<td className='whitespace-nowrap px-20 py-4'>
									{team.total_moving_time ? team.total_moving_time : '-'}
								</td>
								<td className='whitespace-nowrap px-16 py-4'>
									{team.total_distance ? team.total_distance : '-'}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	)
}
