'use client'
import { useState, useEffect, useContext } from 'react'
import { initTE, Input, Ripple } from 'tw-elements'
import { GlobalState } from '../global-provider'

export default function Feedback() {
	const global = useContext(GlobalState)
	useEffect(() => {
		initTE({ Ripple, Input })
	}, [])

	const [formData, setFormData] = useState({
		subject: '',
		email: '',
		message: ''
	})

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()
		if (
			formData.subject === '' ||
			formData.email === '' ||
			formData.message === ''
		) {
			global.dispatch({
				type: 'TOAST',
				payload: { message: 'Please fill out all fields.', type: 'error' }
			})
			return
		}

		fetch('/api/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					setFormData({
						subject: '',
						email: '',
						message: ''
					})
					global.dispatch({
						type: 'TOAST',
						payload: { message: data.message, type: 'success' }
					})
				})
			} else {
				response.json().then((error) => {
					global.dispatch({
						type: 'TOAST',
						payload: { message: error.error, type: 'error' }
					})
				})
			}
		})
	}

	return (
		<main className='grid justify-items-center text-center'>
			<h2 className='text-2xl mb-2'>
				Submit feedback, suggestions or issues using the form below:
			</h2>
			<form
				className='flex-col items-center w-fit justify-center m-4 p-3 rounded-lg border border-amber-500 bg-neutral-400 shadow-lg dark:bg-neutral-800'
				onSubmit={handleFormSubmit}
			>
				<div className='inline-flex'>
					<div className='relative m-2 ' data-te-input-wrapper-init>
						<input
							className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
							type='text'
							name='subject'
							value={formData.subject}
							onChange={handleInputChange}
						/>
						<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
							Subject
						</label>
					</div>
					<div className='relative m-2' data-te-input-wrapper-init>
						<input
							className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
							type='text'
							name='email'
							value={formData.email}
							onChange={handleInputChange}
						/>
						<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
							Email
						</label>
					</div>
				</div>
				<div className='relative my-2' data-te-input-wrapper-init>
					<textarea
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						rows={4}
						name='message'
						value={formData.message}
						onChange={handleInputChange}
					/>
					<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
						Message
					</label>
				</div>
				<button
					className='inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
					type='submit'
					data-te-ripple-init
					data-te-ripple-color='light'
					style={{
						backgroundImage:
							'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
					}}
					onClick={handleFormSubmit}
				>
					Submit
				</button>
			</form>
		</main>
	)
}
