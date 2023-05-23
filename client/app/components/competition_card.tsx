import Countdown from '../hooks/countdown'

export default function CompetitionCard(competition) {
	return (
		<article className='text-center inline-block max-w-sm m-2 p-1 rounded-lg border border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'>
			<h3 className='text-xl font-medium'>{competition.title}</h3>
			<h4 className='text-lg font-medium mb-2'>
				{competition.type} · {competition.activity_type}
			</h4>
			<h4 className='text-lg font-medium mb-2'>
				Prize Pool: {competition.prize_pool} FPcoins
			</h4>
			<p>
				Organizer:{' '}
				{`${competition.organizer.first_name} ${competition.organizer.last_name}`}
			</p>
			<p>Objective:</p>
				<p>Starts in: {Countdown(competition.start_date, 'Started')}</p>
			<p>Ends in: {Countdown(competition.end_date, 'Ended')}</p>
		</article>
	)
}
