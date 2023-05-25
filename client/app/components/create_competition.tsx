import { useState, useEffect, useContext } from 'react'
import { Ripple, Input, Select, initTE } from 'tw-elements'
import DatePicker from 'react-datepicker'
import { addDays, isSunday } from 'date-fns'
import { GlobalState } from '../global-provider'
import activities_list from '../misc/activities.json'
import Countdown from '../hooks/countdown'

export default function CreateCompetition() {
	const global = useContext(GlobalState)

	const activities = activities_list.activities

	const [formData, setFormData] = useState({
		title: '',
		type: '',
		activity_type: '',
		prize_pool: 0,
		distance: null,
		start_date: '',
		end_date: ''
	})

	useEffect(() => {
		initTE({ Ripple, Input, Select })
	}, [])

	useEffect(() => {
		const dateString = formData.start_date
		const date = new Date(dateString)
		date.setDate(date.getDate() + 7)
		const endDate = date.toUTCString()
		setFormData({
			...formData,
			end_date: endDate
		})
	}, [formData.start_date])

	const getNextFourSundays = () => {
		const currentDate = new Date()
		const sundays = []
		let nextDate = addDays(currentDate, 1)
		while (sundays.length < 4) {
			if (isSunday(nextDate)) {
				sundays.push(nextDate)
			}
			nextDate = addDays(nextDate, 1)
		}
		return sundays
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('/api/competitions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}).then((res) => {
			if (res.ok) {
				setFormData({
					title: '',
					type: '',
					activity_type: '',
					prize_pool: 0,
					distance: null,
					start_date: '',
					end_date: ''
				})
				res.json().then((data) => {
					console.log(data)
					global.dispatch({ type: 'REFRESH', payload: data.user })
				})
				global.dispatch({
					type: 'TOAST',
					payload: {
						message: 'Competition created successfully.',
						type: 'success'
					}
				})
			} else {
				res.json().then((error) => {
					console.log(error)
					global.dispatch({
						type: 'TOAST',
						payload: { message: error.error, type: 'error' }
					})
				})
			}
		})
	}

	return (
		<>
			<h1 className='flex justify-center text-3xl'>Organize a competition</h1>
			<article className='my-3'>
				<h2 className='flex justify-center text-lg font-semibold'>
					Here are the rules:
				</h2>
				<ul className='grid justify-center'>
					<li>
						· Competition can be <b>solo</b> or <b>team</b>
					</li>
					<li>· Select discipline & objective</li>
					<li>· Select a starting date. Competition will run for 7 days</li>
					<li>· Competition can only start on a Sunday</li>
					<li>· Competition ends on the following Sunday</li>
					<li>· The prize pool you set comes out of your bank</li>
				</ul>
			</article>
			<section className='grid gap-6 grid-cols-1 sm:grid-cols-2 text-center mb-6'>
				<form
					className='text-center inline-block ml-2 px-5 pb-5 rounded-lg border border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'
					onSubmit={handleSubmit}
				>
					<h2 className='text-xl font-bold mb-2'>Enter competition details</h2>
					<div className='flex'>
						<div className='relative mb-2 flex-auto' data-te-input-wrapper-init>
							<input
								className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
								type='text'
								name='title'
								value={formData.title}
								onChange={handleInputChange}
							/>
							<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
								Competition Title
							</label>
						</div>
						<select
							name='activity_type'
							onChange={handleInputChange}
							className='relative my-2'
							data-te-select-init
						>
							<option value=''>Select a discipline</option>
							{activities.map((activity) => (
								<option key={activity} value={activity}>
									{activity}
								</option>
							))}
						</select>
					</div>
					<div className='grid grid-cols-1 sm:grid-cols-2'>
						<div>
							<p className='my-2'>Type:</p>
							<div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
								<input
									className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-warning checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-warning checked:after:bg-warning checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-warning checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-warning dark:checked:after:border-warning dark:checked:after:bg-warning dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-warning dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
									type='radio'
									id='inlineRadio1'
									value='solo'
									checked={formData.type === 'solo'}
									onChange={() => setFormData({ ...formData, type: 'solo' })}
								/>
								<label
									className='mt-px inline-block pl-[0.15rem] hover:cursor-pointer'
									htmlFor='inlineRadio1'
								>
									Solo
								</label>
							</div>
							<div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
								<input
									className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-warning checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-warning checked:after:bg-warning checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-warning checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-warning dark:checked:after:border-warning dark:checked:after:bg-warning dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-warning dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
									type='radio'
									id='inlineRadio2'
									value='team'
									checked={formData.type === 'team'}
									onChange={() => setFormData({ ...formData, type: 'team' })}
								/>
								<label
									className='mt-px inline-block pl-[0.15rem] hover:cursor-pointer'
									htmlFor='inlineRadio2'
								>
									Team
								</label>
							</div>
						</div>
						<div>
							<p className='my-2'>Objective:</p>
							<div className='mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]'>
								<input
									className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-warning checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-warning checked:after:bg-warning checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-warning checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-warning dark:checked:after:border-warning dark:checked:after:bg-warning dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-warning dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
									type='radio'
									id='inlineRadio3'
									value='distance'
									checked={formData.distance === true}
									onChange={() => setFormData({ ...formData, distance: true })}
								/>
								<label
									className='mt-px inline-block pl-[0.15rem] hover:cursor-pointer'
									htmlFor='inlineRadio3'
								>
									Distance
								</label>
							</div>
						</div>
					</div>
					<DatePicker
						className='my-2 text-center text-lg font-semibold border-2 rounded-md border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'
						selected={formData.start_date}
						onChange={(date) => setFormData({ ...formData, start_date: date })}
						includeDates={getNextFourSundays()}
						placeholderText='Select a starting date'
						withPortal
					/>
					<div>
						<label htmlFor='customRange1' className='mb-2'>
							How much is the prize pool? You have{' '}
							{formData.prize_pool === 0
								? global.state.profile.FPcoins
								: global.state.profile.FPcoins - formData.prize_pool}{' '}
							FPcoins left.
						</label>
						<input
							type='range'
							className='transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200'
							id='customRange1'
							min='0'
							max={global.state.profile.FPcoins}
							step='10'
							value={formData.prize_pool || 0}
							onChange={(e) =>
								setFormData({
									...formData,
									prize_pool: parseInt(e.target.value)
								})
							}
						/>
						<h4 className='text-center text-lg font-semibold'>
							{formData.prize_pool || 0} FPcoins
						</h4>
					</div>
					<button
						className='inline-block mx-auto mt-2 rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
						type='submit'
						data-te-ripple-init
						data-te-ripple-color='light'
						style={{
							backgroundImage:
								'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
						}}
						onClick={handleSubmit}
					>
						Create Competition
					</button>
				</form>
				<article className='grid text-center max-w-sm rounded-lg border border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'>
					<h2 className='text-xl font-bold'>Competition Preview</h2>
					<h3 className='text-xl font-medium'>
						{formData.title ? formData.title : 'Title'}
					</h3>
					<h4 className='text-lg font-medium capitalize'>
						{formData.type ? formData.type : 'type'} ·{' '}
						{formData.activity_type ? formData.activity_type : 'discipline'}
					</h4>
					<h4 className='text-lg font-medium'>
						Prize Pool: {formData.prize_pool ? formData.prize_pool : 0} FPcoins
					</h4>
					<p>
						Organizer:{' '}
						{`${global.state.profile.first_name} ${global.state.profile.last_name}`}
					</p>
					<p>Objective: {formData.distance && 'Distance'}</p>
					<p>Starts in: {Countdown(formData.start_date, 'Started')}</p>
					<p>Ends in: {Countdown(formData.end_date, 'Ended')}</p>
				</article>
			</section>
		</>
	)
}
