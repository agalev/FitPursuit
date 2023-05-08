import { useState, useEffect } from 'react'
import { ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function ChartElement() {
	const [activities, setActivities] = useState(null)
	useEffect(() => {
		fetch('/api/stats')
			.then((response) => response.json())
			.then((data) => setActivities(data))
	}, [])

  console.log(activities)
  
  
	// activities !== null && Object.keys(activities).forEach((key) => {
	// 	agg.push({[key]: activities[key]})
	// })

	const data = [
		{
			name: 'Page A',
			uv: 4000,
			pv: 2400,
			amt: 2400
		},
		{
			name: 'Page B',
			uv: 3000,
			pv: 1398,
			amt: 2210
		},
		{
			name: 'Page C',
			uv: 2000,
			pv: 9800,
			amt: 2290
		},
		{
			name: 'Page D',
			uv: 2780,
			pv: 3908,
			amt: 2000
		},
		{
			name: 'Page E',
			uv: 1890,
			pv: 4800,
			amt: 2181
		},
		{
			name: 'Page F',
			uv: 2390,
			pv: 3800,
			amt: 2500
		},
		{
			name: 'Page G',
			uv: 3490,
			pv: 4300,
			amt: 2100
		}
	]
	return (
		<>
			<ResponsiveContainer className='mx-auto' width={'90%'} height={300}>
				<BarChart data={data}>
					<Bar dataKey='uv' fill='#8884d8' />
				</BarChart>
			</ResponsiveContainer>
		</>
	)
}
