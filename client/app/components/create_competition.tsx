import { useState, useEffect, useContext } from 'react'
import { Ripple, Input, Select, initTE } from 'tw-elements'
import { GlobalState } from '../global-provider'

export default function CreateCompetition() {
	const global = useContext(GlobalState)

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		type: '',
		activity_type: '',
		prize_pool: 0,
		distance: null,
		average_speed: null,
		max_speed: null,
		start_date: '',
		end_date: ''
	})

	console.log(formData.start_date)

	useEffect(() => {
		initTE({ Ripple, Input, Select })
	}, [])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		console.log(e.target.value)
		setFormData({
			...formData,
			[name]: value
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<section>
			<p>Few Competition rules to keep in mind:</p>
			<ul>
				<li>· Pick a starting date. Competition will run for 7 days.</li>
				<li>· Competition can only start on a Sunday.</li>
				<li>· Competition ends on the following Sunday.</li>
				<li>· The prize pool you set comes out of your bank!</li>
				<li>
					· Competition can be <b>solo</b> or <b>team</b>
				</li>
			</ul>
			<form onSubmit={handleSubmit}>
				<div className='relative my-2' data-te-input-wrapper-init>
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
        <div className='relative my-2' data-te-input-wrapper-init>
					<input
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						type='date'
						name='start_date'
						value={formData.start_date}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Start Date
					</label>
				</div>
			</form>
		</section>
	)
}
