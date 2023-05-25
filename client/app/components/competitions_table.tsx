import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CompetitionsTable() {
	const [competitions, setCompetitions] = useState(null)
	const [sortField, setSortField] = useState('')
	const [sortOrder, setSortOrder] = useState('asc')

	let index = 1

	useEffect(() => {
		fetch('/api/competitions')
			.then((response) => response.json())
			.then((data) => setCompetitions(data))
	}, [])

	const sortTable = (category) => {
		const order = category === sortField && sortOrder === 'asc' ? 'desc' : 'asc'
		setSortField(category)
		setSortOrder(order)
		handleSorting(category, order)
	}

	const handleSorting = (sortField, sortOrder) => {
		if (sortField) {
			const sorted = [...competitions].sort((a, b) => {
				if (a[sortField] === null || b[sortField] === null) return 0
				return (
					a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
						numeric: true
					}) * (sortOrder === 'asc' ? 1 : -1)
				)
			})
			setCompetitions(sorted)
		}
	}

	return (
		<section className='flex flex-col overflow-x-auto'>
			<h2 className='text-2xl my-2 font-bold text-center'>Competitions</h2>
			<table className='min-w-full text-center text-sm font-light'>
				<thead className='border-b bg-amber-500 text-white font-medium dark:border-neutral-500'>
					<tr>
						<th scope='col' className='cursor-pointer py-4'>
							#
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortTable('title')}
						>
							Title
							{sortField === 'title' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('type')}
						>
							Type
							{sortField === 'type' && sortOrder === 'asc' ? (
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
							Discipline
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
							onClick={() => sortTable('start_date')}
						>
							Starts
							{sortField === 'start_date' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('end_date')}
						>
							Ends
							{sortField === 'end_date' && sortOrder === 'asc' ? (
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
							onClick={() => sortTable('prize_pool')}
						>
							Prize Pool
							{sortField === 'prize_pool' && sortOrder === 'asc' ? (
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
					{competitions &&
						competitions.map((competition) => (
							<tr
								key={competition.id}
								className='border-b dark:border-neutral-500'
							>
								<td className='whitespace-nowrap px-2 py-4 font-medium'>
									{index++}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{competition.title}
								</td>
								<td className='whitespace-nowrap px-4 py-4'>
									{competition.type}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{competition.activity_type}
								</td>
								<td className='whitespace-nowrap py-4'>
									{competition.start_date}
								</td>
								<td className='whitespace-nowrap pl-2 py-4'>
									{competition.end_date}
								</td>
								<td className='whitespace-nowrap px-10 py-4'>
									{competition.prize_pool}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	)
}
