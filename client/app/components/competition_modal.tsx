'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Countdown from '../hooks/countdown'

export default function CompetitionModal({
	competition,
	details,
	isEligible,
	join,
	close
}) {
	details &&
		details.sort((a, b) => {
			if (a['score'] === null || b['score'] === null) return 0
			return (
				a['score'].toString().localeCompare(b['score'].toString(), 'en', {
					numeric: true
				}) * -1
			)
		})

	const modalRef = useRef(null)

	useEffect(() => {
		function handleClickOutside(event) {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				close()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [close])

	let index = 0

	return (
		<div className='fixed inset-0 flex items-center justify-center z-20 backdrop-blur-sm bg-slate-700 bg-opacity-30'>
			<div className='bg-slate-900 rounded-lg p-6 z-30' ref={modalRef}>
				<h3 className='text-xl font-medium'>{competition.title}</h3>
				<h4 className='text-lg font-medium mb-2 capitalize'>
					{competition.type} · {competition.activity_type}
				</h4>
				<h4 className='text-lg font-medium mb-2'>
					Prize Pool: {competition.prize_pool} FPcoins
				</h4>
				<p>
					Organizer:{' '}
					{competition.organizer &&
						`${competition.organizer.first_name} ${competition.organizer.last_name}`}
				</p>
				<p>Objective: Distance</p>
				<p>Starts in: {Countdown(competition.start_date, 'Started')}</p>
				<p>Ends in: {Countdown(competition.end_date, 'Ended')}</p>
				<section className='flex flex-col overflow-x-auto'>
					<h2 className='text-2xl my-2 font-bold text-center'>Leaderboard</h2>
					<table className='min-w-full text-center text-sm font-light'>
						<thead className='border-b bg-amber-500 text-white font-medium dark:border-neutral-500'>
							<tr>
								<th scope='col' className='cursor-pointer py-4'>
									#
								</th>
								<th scope='col' className='hover:bg-slate-600 cursor-pointer'>
									{competition.type === 'solo' ? 'Athlete' : 'Team'}
								</th>
								<th scope='col' className='hover:bg-slate-600 cursor-pointer'>
									Score
								</th>
							</tr>
						</thead>
						<tbody>
							{details &&
								details.map(
									(handler) => (
										index++,
										(
											<tr
												key={handler.id}
												className='border-b dark:border-neutral-500'
											>
												<td className='whitespace-nowrap px-2 py-4 font-medium'>
													{index === 1 ? (
														<Image
															src='/medal_1.svg'
															alt='1st place'
															width={30}
															height={30}
														/>
													) : index === 2 ? (
														<Image
															src='/medal_2.svg'
															alt='2nd place'
															width={30}
															height={30}
														/>
													) : index === 3 ? (
														<Image
															src='/medal_3.svg'
															alt='3rd place'
															width={30}
															height={30}
														/>
													) : (
														index
													)}
												</td>
												<td className='whitespace-nowrap px-6 py-4'>
													{competition.type === 'solo'
														? `${handler.user.first_name} ${handler.user.last_name}`
														: `${handler.team.name}`}
												</td>
												<td className='whitespace-nowrap px-4 py-4'>
													{handler.score} miles
												</td>
											</tr>
										)
									)
								)}
						</tbody>
					</table>
				</section>
				{isEligible && (
					<button
						type='button'
						className='inline-block px-2 mt-4 w-48 mr-2 bg-green-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
						onClick={join}
					>
						Join Competition
					</button>
				)}
				<button
					className='inline-block px-2 mt-4 w-48 bg-red-500 rounded pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
					onClick={close}
				>
					Close
				</button>
			</div>
		</div>
	)
}
