'use client'
import { useState, useEffect, useContext, use } from 'react'
import { initTE, Ripple, Input } from 'tw-elements'
import { GlobalState } from '../global-provider'
import ScrollContainer from '../components/scroll_container'

export default function Messages() {
	const global = useContext(GlobalState)

	const [messages, setMessages] = useState(null)
	const [selectedUser, setSelectedUser] = useState(null)
	const [message, setMessage] = useState('')

	useEffect(() => {
		initTE({ Ripple, Input })
	}, [selectedUser])

	useEffect(() => {
		fetch('/api/messages', {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((data) => {
				setMessages(
					data.sort((a, b) => {
						return a.created_at.localeCompare(b.created_at)
					})
				)
			})
	}, [selectedUser])

	console.log(messages)

	const handleSubmit = (e) => {
		e.preventDefault()
		fetch('/api/messages', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: message,
				receiver_id: selectedUser.id
			})
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setMessages([...messages, data])
				setMessage('')
			})
	}

	const conversations_list = []
	const uniqueIDs = []

	messages &&
		[...messages].forEach((message) => {
			if (message.sender_id === global.state.profile.id) {
				if (!uniqueIDs.includes(message.receiver_id)) {
					uniqueIDs.push(message.receiver.id)
					conversations_list.push(message.receiver)
				}
			} else if (message.receiver_id === global.state.profile.id) {
				if (!uniqueIDs.includes(message.sender_id)) {
					uniqueIDs.push(message.sender.id)
					conversations_list.push(message.sender)
				}
			}
		})

	if (!global.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>
				You need to be signed in to access this page.
			</h1>
		)
	}
	return (
		<main className='flex' style={{ height: 'calc(100vh - 4rem)' }}>
			<div className='flex flex-col min-w-max bg-slate-200'>
				<h2 className='text-sm sm:text-xl py-2 pl-1 font-bold'>Users</h2>
				<ul className='mt-4'>
					{conversations_list.map((user) => (
						<li
							key={user.id}
							className='flex items-center py-1 rounded hover:bg-slate-300 cursor-pointer'
							onClick={() => setSelectedUser(user)}
						>
							<img
								className='w-8 h-8 rounded-full mr-2 border-2 border-amber-500 shadow-2xl'
								src={user.image || '/avatar.jpg'}
								alt='avatar'
							/>
							<span>{`${user.first_name} ${user.last_name}`}</span>
						</li>
					))}
				</ul>
			</div>
			<div className='flex flex-col flex-grow bg-slate-100'>
				{/* Header */}
				<header className='py-2 pl-1 bg-slate-200'>
					<h1 className='text-sm sm:text-xl font-bold'>
						{selectedUser
							? `Conversation with ${selectedUser.first_name} ${selectedUser.last_name}`
							: `Conversations`}
					</h1>
				</header>
				{/* Messages */}
				<div className='flex-grow overflow-y-auto'>
					<ScrollContainer>
						{/* Message bubbles go here */}
						{selectedUser &&
							messages.map((message) => {
								if (
									message.sender_id === selectedUser.id ||
									message.receiver_id === selectedUser.id
								) {
									return (
										<div
											key={message.id}
											className={`flex flex-col my-2 ml-1 rounded text-black ${
												message.sender_id === global.state.profile.id
													? 'bg-sky-200'
													: 'bg-gray-200'
											}`}
										>
											<div className='flex items-center p-1'>
												<img
													className='w-8 h-8 rounded-full mr-2 mb-1 border-2 border-amber-500 shadow-2xl'
													src={
														message.sender_id === global.state.profile.id
															? global.state.profile.image || '/avatar.jpg'
															: selectedUser.image || '/avatar.jpg'
													}
													alt='avatar'
												/>
												<span className='text-xs font-bold'>
													{message.sender_id === global.state.profile.id
														? `You · ${message.created_at}`
														: `${selectedUser.first_name} ${selectedUser.last_name} · ${message.created_at}`}
												</span>
											</div>
											<p className='text-black rounded-lg my-1 ml-1'>
												{message.content}
											</p>
										</div>
									)
								}
							})}
					</ScrollContainer>
				</div>
				{selectedUser && (
					<form className='p-1' onSubmit={handleSubmit}>
						<div className='relative mb-1' data-te-input-wrapper-init>
							<input
								className='peer text-black block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
								type='text'
								name='message'
								value={message}
								onChange={(e) => setMessage(e.target.value)}
							/>
							<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'>
								Type your message
							</label>
						</div>
						<button
							type='submit'
							className='bg-sky-700 inline-block px-8 py-2 rounded-lg text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
							data-te-ripple-init
							data-te-ripple-color='light'
						>
							Send
						</button>
					</form>
				)}
			</div>
		</main>
	)
}
