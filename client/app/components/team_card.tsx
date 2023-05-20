import { useState, useEffect, useContext } from 'react'
import { initTE, Ripple } from 'tw-elements'
import { GlobalState } from '../global-provider'

export default function TeamCard(team) {
	const global = useContext(GlobalState)
	const [isPending, setIsPending] = useState(false)

	useEffect(() => {
		initTE({ Ripple })
	}, [])

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
			<p>Members: {team.members}</p>
			<p>Wins: {team.wins}</p>
			<p>Leader: {`${team.leader.first_name} ${team.leader.last_name}`}</p>
			<h4 className='text-lg font-medium my-1'>Stats</h4>
			{team.total_distance > 0 && <p>Distance: {team.total_distance}</p>}
			{team.total_moving_time > 0 && (
				<p>Moving Time: {team.total_moving_time}</p>
			)}
			{team.average_speed > 0 && <p>Avg Speed: {team.average_speed}</p>}
			{team.max_speed > 0 && <p>Max Speed: {team.max_speed}</p>}
			{!global.state.profile.team && !isPending && (
				<button
					type='button'
					className='inline-block rounded border border-warning px-3 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'
					data-te-ripple-init
					data-te-ripple-color='light'
					onClick={handleMessage}
				>
					ask to join
				</button>
			)}
		</article>
	)
}
