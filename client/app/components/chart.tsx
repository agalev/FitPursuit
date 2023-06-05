import { useState, useEffect, useContext } from 'react'
import {
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	CartesianGrid
} from 'recharts'
import { GlobalState } from '../global-provider'

export default function ChartElement() {
	const global = useContext(GlobalState)

	const [activities, setActivities] = useState(null)
	const [chartData, setChartData] = useState({
		dataset: [],
		bar_key: ''
	})

	useEffect(() => {
		async function init() {
			const te = await import('tw-elements')
			await te.initTE({ Select: te.Select })
		}
		init()
	}, [])

	useEffect(() => {
		fetch('/api/stats')
			.then((response) => response.json())
			.then((data) => setActivities(Object.entries(JSON.parse(data))))
	}, [])

	const tooltip_map = {
		distance: 'Total distance(miles) travelled',
		moving_time: 'Total time(minutes) spent exercising',
		total_elevation_gain: 'Total elevation gain(feet)',
		average_speed: 'Average Speed (mph)',
		max_speed: 'Max Speed (mph)',
		average_heartrate: 'Average Heartrate (bpm)',
		max_heartrate: 'Max Heartrate (bpm)'
	}

	const stats =
		activities &&
		activities.map((activity) => {
			return {
				category: activity[0],
				stats: Object.entries(activity[1]).map((stat) => {
					return {
						discipline: [stat[0]].toString(),
						[activity[0]]: stat[1]
					}
				})
			}
		})

	const handleInputChange = (e) => {
		const categoryIndex = stats.findIndex(
			(category) => category['category'] === e.target.value
		)
		setChartData({
			dataset: stats[categoryIndex]['stats'],
			bar_key: e.target.value
		})
	}

	return (
		<section className='rounded-lg mx-2 my-4 text-center'>
			<h2 className='text-2xl my-2 font-bold'>{`${global.state.profile.first_name}'s Dynamic Chart`}</h2>
			<select
				name='chartSelect'
				onChange={handleInputChange}
				data-te-select-init
			>
				<option>Select a category to view chart</option>
				{stats &&
					stats.map((stat) => (
						<option key={stat['category']} value={stat['category']}>
							{stat['category']}
						</option>
					))}
			</select>
			{chartData.bar_key && (
				<p className='text-lg my-2'>{tooltip_map[chartData.bar_key]}</p>
			)}
			<ResponsiveContainer className='mx-auto' width={'100%'} height={400}>
				<BarChart data={chartData.dataset}>
					<XAxis dataKey='discipline' />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey={chartData.bar_key} fill='#8884d8' />
					<CartesianGrid strokeDasharray='1 1' />
				</BarChart>
			</ResponsiveContainer>
		</section>
	)
}
