import { useState, useContext } from 'react'
import { GlobalState } from '../global-provider'

export default function TeamCard(team) {
	const global = useContext(GlobalState)
	const [isPending, setIsPending] = useState(false)

	const convertSecondsToHours = (seconds) => {
		const hours = Math.floor(seconds / 3600)
		const remainingMinutes = Math.floor((seconds % 3600) / 60)
		const remainingSeconds = (seconds % 3600) % 60
		return hours > 0
			? `${hours}h ${remainingMinutes}m ${remainingSeconds}s`
			: `${remainingMinutes}m ${remainingSeconds}s`
	}

	const handleMessage = () => {
		setIsPending(true)
		fetch('/api/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: `${global.state.profile.first_name} ${global.state.profile.last_name} has requested to join ${team.name}.`,
				receiver_id: team.leader_id
			})
		}).then((res) => {
			if (res.ok) {
				global.dispatch({
					type: 'TOAST',
					payload: {
						type: 'success',
						message: 'Your request has been sent.'
					}
				})
			}
		})
	}

	return (
		<article className='text-center inline-block max-w-sm m-2 p-1 rounded-lg border border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'>
			<div className='w-32 h-32 mx-auto rounded-full bg-slate-300'>
				<img
					src={team.image || '/svg/circle_logo_color.svg'}
					className='w-full h-full rounded-full object-cover'
					alt='team logo'
				/>
			</div>
			<h3 className='text-xl font-medium'>{team.name}</h3>
			<h4 className='text-lg font-medium mb-2'>{team.activity_type}</h4>
			<p>Leader: {`${team.leader.first_name} ${team.leader.last_name}`}</p>
			<p>Members: {team.members}</p>
			<p>Wins: {team.wins}</p>
			<h4 className='text-lg font-medium my-1'>Stats</h4>
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
				{team.max_speed ? `${Math.round(team.max_speed * 100) / 100} mph` : '-'}
			</p>
			{!global.state.profile.team && !isPending && (
				<button
					type='button'
					className='inline-block rounded border border-warning px-3 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					onClick={handleMessage}
				>
					ask to join
				</button>
			)}
		</article>
	)
}
