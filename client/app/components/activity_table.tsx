import React, { useState, useEffect } from 'react'

export default function ActivityTable() {
	const [activities, setActivities] = useState(null)
	const [sortField, setSortField] = useState('')
	const [sortOrder, setSortOrder] = useState('asc')

	let index = 1

	useEffect(() => {
		fetch('/api/activities')
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
		<div className='flex flex-col overflow-x-auto'>
			<div className='sm:-mx-6 lg:-mx-8'>
				<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
					<div className='overflow-x-auto'>
						<table className='min-w-full text-center text-sm font-light'>
							<thead className='border-b bg-amber-500 text-white font-medium dark:border-neutral-500'>
								<tr>
									<th scope='col' className='px-6 py-4 hover:bg-slate-600'>
										#
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('name')}
									>
										Activity Name
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('activity_type')}
									>
										Activity Type
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('start_date_local')}
									>
										Date & Time
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('timezone')}
									>
										Timezone & Location
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('distance')}
									>
										Distance
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('moving_time')}
									>
										Time Exercising
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('total_elevation_gain')}
									>
										Elevation Gain
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('average_speed')}
									>
										Average Speed
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('max_speed')}
									>
										Max Speed
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('average_heartrate')}
									>
										Average Heartrate
									</th>
									<th
										scope='col'
										className='px-6 py-4 hover:bg-slate-600'
										onClick={() => sortActivities('max_heartrate')}
									>
										Max Heartrate
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
											<td className='whitespace-nowrap px-6 py-4'>
												{activity.name}
											</td>
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
											<td className='whitespace-nowrap px-6 py-4'>
												{convertSecondsToHours(activity.moving_time)}
											</td>
											<td className='whitespace-nowrap px-6 py-4'>
												{Math.round(activity.total_elevation_gain * 100) / 100}
												ft
											</td>
											<td className='whitespace-nowrap px-6 py-4'>
												{Math.round(activity.average_speed * 100) / 100}mph
											</td>
											<td className='whitespace-nowrap px-6 py-4'>
												{Math.round(activity.max_speed * 100) / 100}mph
											</td>
											<td className='whitespace-nowrap px-6 py-4'>
												{activity.average_heartrate ? `${activity.average_heartrate}bpm` : '-'}
											</td>
											<td className='whitespace-nowrap px-6 py-4'>
												{activity.max_heartrate ? `${activity.max_heartrate}bpm` : '-'}
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}
