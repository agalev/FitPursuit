import { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../global-provider'
import Countdown from '../hooks/countdown'
import CompetitionModal from './competition_modal'

export default function CompetitionCard(competition) {
	const global = useContext(GlobalState)
	const [isEligible, setIsEligible] = useState(false)
	const [details, setDetails] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		const starts = new Date(competition.start_date)
		const ends = new Date(competition.end_date)
		if (
			competition.type === 'solo' &&
			starts > new Date() &&
			ends > new Date()
		) {
			setIsEligible(true)
			global.state.profile.competitions.forEach((comp) => {
				if (comp.id === competition.id) {
					setIsEligible(false)
				}
			})
		} else if (
			global.state.profile.team &&
			competition.type === 'team' &&
			starts > new Date() &&
			ends > new Date()
		) {
			setIsEligible(true)
			if (
				!!global.state.profile.team.competitions.find(
					(comp) => comp.id === competition.id
				)
			) {
				setIsEligible(false)
			}
		}
	}, [global.state.profile, isEligible])

	const handleDetailedView = () => {
		setIsModalOpen(true)
		fetch(`/api/competitions/${competition.id}`)
			.then((res) => res.json())
			.then((data) => {
				setDetails(data)
			})
	}

	const handleJoin = () => {
		fetch(`/api/competitions/${competition.type}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ competition_id: competition.id })
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					global.dispatch({ type: 'REFRESH', payload: data })
				})
				global.dispatch({
					type: 'TOAST',
					payload: {
						message: 'Competition joined successfully.',
						type: 'success'
					}
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
		<article className='text-center inline-block max-w-sm m-2 p-1 rounded-lg border border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'>
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
			<button
				type='button'
				className='inline-block rounded border border-warning px-3 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
				onClick={handleDetailedView}
			>
				View Details
			</button>
			{isModalOpen && (
				<CompetitionModal
					competition={competition}
					details={details}
					isEligible={isEligible}
					join={handleJoin}
					close={() => setIsModalOpen(false)}
				/>
			)}
			{isEligible && (
				<button
					type='button'
					className='inline-block rounded border border-warning px-3 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					onClick={handleJoin}
				>
					Join Competition
				</button>
			)}
		</article>
	)
}
