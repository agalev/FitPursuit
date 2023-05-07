import { useState, useEffect } from 'react'
import { Chart, initTE } from 'tw-elements'

export default function ChartElement() {
	const [activities, setActivities] = useState(null)
	useEffect(() => {
		initTE({ Chart })
	}, [])

	useEffect(() => {
		fetch('/api/agg_activities')
			.then((response) => response.json())
			.then((data) => setActivities(JSON.parse(data)))
	}, [])

	// const to_chart = []
	// 	for (let key in activities) {
	//     to_chart.push(key)
	// 		to_chart.push(activities[key])
	// 	}
	//   console.log(to_chart)

	// for (let key in activities) {
	// 	console.log(key, activities[key])
	// }

	// activities !== null &&
	// 	Object.keys(activities).forEach((key, index) => {
	//     console.log(index)
	// 		console.log(key, activities[key])
	// 	})

	let activity_types = ''

	activities !== null &&
		Object.values(activities['activity_type']).forEach((key: string) => {
			activity_types += `'${key}',`
		})
	activity_types = activity_types.slice(0, -1)
	activity_types = `[${activity_types}]`
	console.log(activity_types)

	return (
		<>
			<p>Chart</p>
			{activities !== null ? (
				// Object.keys(activities).map((key, index) => {
				// 	return (
				<div className='mx-auto w-3/5 overflow-hidden'>
					<canvas
						data-te-chart='bar'
						data-te-dataset-label='Traffic'
						data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
						data-te-dataset-data='[2112, 2343, 2545, 3423, 2365, 1985, 987]'
					></canvas>
				</div>
			) : (
				// )
				// })
				<div>Loading...</div>
			)}
		</>
	)
}
