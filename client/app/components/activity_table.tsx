import React, { useState, useEffect } from 'react'

function ActivityTable() {
	const [activities, setActivities] = useState(null)
	const rows = []

	useEffect(() => {
		fetch('/api/activities')
			.then((response) => response.json())
			.then((data) => setActivities(data))
	}, [])
  // for(let key in activities) {
	//   console.log(key)
  // }
  console.log(JSON.parse(activities))
  for (let key in JSON.parse(activities)) {
    console.log(JSON.parse(activities)[key])
  }
  

	// Object.keys(activities.activity_type).forEach((key) => {
	// 	rows.push(
	// 		<tr key={key}>
	// 			<td>{activities.activity_type[key]}</td>
	// 			<td>{activities.distance[key]}</td>
	// 			<td>{activities.moving_time[key]}</td>
	// 			<td>{activities.total_elevation_gain[key]}</td>
	// 			<td>{activities.average_speed[key]}</td>
	// 			<td>{activities.max_speed[key]}</td>
	// 			<td>{activities.average_heartrate[key]}</td>
	// 			<td>{activities.max_heartrate[key]}</td>
	// 		</tr>
	// 	)
	// })

  if (activities === null) {
    return (
      <div>Loading...</div>
    )
  }

	return (
		<table>
			<thead>
				<tr>
					<th>Activity Type</th>
					<th>Distance</th>
					<th>Moving Time</th>
					<th>Total Elevation Gain</th>
					<th>Average Speed</th>
					<th>Max Speed</th>
					<th>Average Heartrate</th>
					<th>Max Heartrate</th>
				</tr>
			</thead>
			<tbody>
        {rows}
			</tbody>
		</table>
	)
}

export default ActivityTable
