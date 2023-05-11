import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { GlobalState } from '../global-provider'

export default function ActivitiesTable({ param }) {
	const global = useContext(GlobalState)

	const [activities, setActivities] = useState(null)
	const [sortField, setSortField] = useState('')
	const [sortOrder, setSortOrder] = useState('asc')

	let index = 1

	useEffect(() => {
		fetch(`/api/activities/${param}`)
			.then((response) => response.json())
			.then((data) => setActivities(data))
	}, [])

	const convertSecondsToHours = (seconds) => {
		const hours = Math.floor(seconds / 3600)
		const remainingMinutes = Math.floor((seconds % 3600) / 60)
		const remainingSeconds = (seconds % 3600) % 60
		return hours > 0
			? `${hours}h ${remainingMinutes}m ${remainingSeconds}s`
			: `${remainingMinutes}m ${remainingSeconds}s`
	}

	const sortActivities = (category) => {
		const order = category === sortField && sortOrder === 'asc' ? 'desc' : 'asc'
		setSortField(category)
		setSortOrder(order)
		handleSorting(category, order)
	}

	const handleSorting = (sortField, sortOrder) => {
		console.log(sortField, sortOrder)
		if (sortField) {
			const sorted = [...activities].sort((a, b) => {
				return (
					a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
						numeric: true
					}) * (sortOrder === 'asc' ? 1 : -1)
				)
			})
			setActivities(sorted)
		}
	}

	return (
		<section className='flex flex-col overflow-x-auto'>
			<h2 className='text-2xl my-2 font-bold text-center'>{`${global.state.profile.first_name}'s Activities`}</h2>
			<table className='min-w-full text-center text-sm font-light'>
				<thead className='border-b bg-amber-500 text-white font-medium dark:border-neutral-500'>
					<tr>
						<th scope='col' className='cursor-pointer py-4'>
							#
						</th>
						<th
							scope='col'
							className='hover:bg-slate-600 cursor-pointer'
							onClick={() => sortActivities('name')}
						>
							Activity Name
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
							onClick={() => sortActivities('activity_type')}
						>
							Activity Type
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
							onClick={() => sortActivities('start_date_local')}
						>
							Date & Time
							{sortField === 'start_date_local' && sortOrder === 'asc' ? (
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
							onClick={() => sortActivities('timezone')}
						>
							Timezone & Location
							{sortField === 'timezone' && sortOrder === 'asc' ? (
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
							onClick={() => sortActivities('distance')}
						>
							Distance
							{sortField === 'distance' && sortOrder === 'asc' ? (
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
							onClick={() => sortActivities('moving_time')}
						>
							Moving Time
							{sortField === 'moving_time' && sortOrder === 'asc' ? (
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
							onClick={() => sortActivities('total_elevation_gain')}
						>
							Elev. Gain
							{sortField === 'total_elevation_gain' && sortOrder === 'asc' ? (
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
							onClick={() => sortActivities('average_speed')}
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
							onClick={() => sortActivities('max_speed')}
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
							onClick={() => sortActivities('average_heartrate')}
						>
							Avg Heart
							{sortField === 'average_heartrate' && sortOrder === 'asc' ? (
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
							onClick={() => sortActivities('max_heartrate')}
						>
							Max Heart
							{sortField === 'max_heartrate' && sortOrder === 'asc' ? (
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
					{activities &&
						activities.map((activity) => (
							<tr
								key={activity.strava_id}
								className='border-b dark:border-neutral-500'
							>
								<td className='whitespace-nowrap px-6 py-4 font-medium'>
									{index++}
								</td>
								<td className='whitespace-nowrap px-8 py-4'>{activity.name}</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{activity.activity_type}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{activity.start_date_local}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{activity.timezone}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{Math.round(activity.distance * 100) / 100} miles
								</td>
								<td className='whitespace-nowrap px-8 py-4'>
									{convertSecondsToHours(activity.moving_time)}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{Math.round(activity.total_elevation_gain * 100) / 100} ft
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{Math.round(activity.average_speed * 100) / 100}mph
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{Math.round(activity.max_speed * 100) / 100}mph
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{activity.average_heartrate
										? `${activity.average_heartrate}bpm`
										: '-'}
								</td>
								<td className='whitespace-nowrap px-6 py-4'>
									{activity.max_heartrate
										? `${activity.max_heartrate}bpm`
										: '-'}
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</section>
	)
}
