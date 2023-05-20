'use client'
import { useState, useEffect, useContext } from 'react'
import { initTE, Ripple, Input } from 'tw-elements'
import { GlobalState } from '../global-provider'
import ScrollContainer from '../components/scroll_container'

export default function Messages() {
	const global = useContext(GlobalState)
	const [users, setUsers] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')
	const [messages, setMessages] = useState(null)
	const [teamMessages, setTeamMessages] = useState(null)
	const [selectedUser, setSelectedUser] = useState(null)
	const [message, setMessage] = useState('')
	const [invited, setInvited] = useState(false)

	useEffect(() => {
		if (
			global.state.profile.team &&
			selectedUser &&
			selectedUser.name === global.state.profile.team.name
		) {
			fetch('/api/messages/team')
				.then((res) => res.json())
				.then((data) => {
					setTeamMessages(
						data.sort((a, b) => {
							return a.created_at.localeCompare(b.created_at)
						})
					)
				})
		} else {
			fetch('/api/messages')
				.then((res) => res.json())
				.then((data) => {
					setMessages(
						data.sort((a, b) => {
							return a.created_at.localeCompare(b.created_at)
						})
					)
				})
		}
		initTE({ Ripple, Input })
	}, [selectedUser])

	useEffect(() => {
		fetch('/api/messages/unread')
			.then((response) => response.json())
			.then((data) => {
				setUsers(data.users)
			})
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (message.length === 0) {
			global.dispatch({
				type: 'TOAST',
				payload: {
					type: 'error',
					message: 'Message cannot be empty'
				}
			})
			return
		}
		if (
			global.state.profile.team &&
			selectedUser &&
			selectedUser.name === global.state.profile.team.name
		) {
			fetch('/api/messages/team', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					content: message
				})
			})
				.then((res) => res.json())
				.then((data) => {
					setTeamMessages([...teamMessages, data])
					setMessage('')
				})
		} else {
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
					setMessages([...messages, data])
					setMessage('')
				})
		}
	}

	const handleInvite = () => {
		fetch('/api/teams/leader', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: `${global.state.profile.first_name} ${global.state.profile.last_name} has invited ${selectedUser.first_name} ${selectedUser.last_name} to join ${global.state.profile.team.name}.`,
				receiver_id: selectedUser.id,
				invitation: true
			})
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					setMessages([...messages, data])
					global.dispatch({
						type: 'TOAST',
						payload: {
							type: 'success',
							message: 'Invitation sent.'
						}
					})
					setInvited(true)
				})
			} else {
				res.json().then((data) => {
					global.dispatch({
						type: 'TOAST',
						payload: {
							type: 'error',
							message: data.error
						}
					})
				})
			}
		})
	}

	const handleAccept = () => {
		fetch('/api/teams/join', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: global.state.profile.id,
				team_id: selectedUser.team_id
			})
		}).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					global.dispatch({ type: 'REFRESH', payload: data })
					global.dispatch({
						type: 'TOAST',
						payload: {
							type: 'success',
							message: `You have joined the team.`
						}
					})
				})
			} else {
				res.json().then((data) => {
					global.dispatch({
						type: 'TOAST',
						payload: {
							type: 'error',
							message: data.error
						}
					})
				})
			}
		})
	}

	const conversations_list = []
	const uniqueIDs = []

	messages &&
		[...messages].forEach((message) => {
			if (message.receiver_id === null) {
				return
			} else if (
				message.sender_id === global.state.profile.id &&
				!uniqueIDs.includes(message.receiver_id)
			) {
				uniqueIDs.push(message.receiver.id)
				conversations_list.push({
					with: message.receiver,
					unread: null
				})
			} else if (
				message.receiver_id === global.state.profile.id &&
				!uniqueIDs.includes(message.sender_id) &&
				message.read === false
			) {
				uniqueIDs.push(message.sender.id)
				conversations_list.push({
					with: message.sender,
					unread: 1
				})
			} else if (
				message.receiver_id === global.state.profile.id &&
				!uniqueIDs.includes(message.sender_id) &&
				message.read === true
			) {
				uniqueIDs.push(message.sender.id)
				conversations_list.push({
					with: message.sender,
					unread: null
				})
			} else if (message.read === false) {
				conversations_list.forEach((conversation) => {
					if (conversation.with.id === message.sender_id) {
						conversation.unread += 1
					}
				})
			}
		})

	const handleUserSelect = (user) => {
		setSelectedUser(user)
		conversations_list.forEach((conversation) => {
			if (conversation.unread > 0 && conversation.with.id === user.id) {
				conversation.unread = null
				fetch('/api/messages/unread', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(user.id)
				})
			}
		})
	}

	const handleTeamSelect = () => {
		setSelectedUser(global.state.profile.team)
	}

	const filteredUsers =
		users &&
		users.filter((user) => {
			return JSON.stringify(user)
				.toLowerCase()
				.includes(searchQuery.toLowerCase())
		})

	const displayUsers = searchQuery.length > 0 ? filteredUsers : users

	if (!global.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>
				You need to be signed in to access this page.
			</h1>
		)
	}
	return (
		<main className='flex' style={{ height: 'calc(100vh - 4.5rem)' }}>
			<div className='flex flex-col w-48 bg-slate-200 dark:bg-slate-800'>
				<h2 className='text-sm sm:text-xl py-2 pl-1 font-bold text-center'>
					Users
				</h2>
				<div className='relative mb-3' data-te-input-wrapper-init>
					<input
						type='search'
						className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
						id='Search'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<label
						htmlFor='Search'
						className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'
					>
						Search
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 22 22'
							fill='currentColor'
							className='h-5 w-5 ml-1 inline-block'
						>
							<path
								fillRule='evenodd'
								d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
								clipRule='evenodd'
							/>
						</svg>
					</label>
				</div>
				<span className='font-bold'>Browse all users</span>
				<ul className='ml-1 overflow-auto'>
					{displayUsers &&
						displayUsers.map(
							(user) =>
								user.id !== global.state.profile.id && (
									<li
										key={user.id}
										className='flex items-center py-1 rounded hover:bg-slate-300 text-sm cursor-pointer'
										onClick={() => handleUserSelect(user)}
										data-te-dropdown-item-ref
									>
										<img
											className='w-8 h-8 rounded-full mr-2 border-2 border-amber-500 shadow-2xl inline-block'
											src={user.image || '/avatar.jpg'}
											alt='avatar'
										/>
										<span>
											{user.first_name} {user.last_name}
										</span>
									</li>
								)
						)}
				</ul>
				<hr className='py-0.5 my-2 border-0 bg-amber-500' />
				{global.state.profile.team && (
					<ul className='ml-1'>
						<span className='font-bold'>Team Chat</span>
						<li
							className='flex items-center py-1 rounded hover:bg-slate-300 text-sm cursor-pointer'
							onClick={handleTeamSelect}
						>
							<img
								className='w-8 h-8 rounded-full mr-2 border-2 border-amber-500 shadow-2xl'
								src={
									global.state.profile.team.image ||
									'/svg/circle_logo_color.svg'
								}
								alt='team avatar'
							/>
							<span>{global.state.profile.team.name}</span>
						</li>
						<hr className='py-0.5 my-2 border-0 bg-amber-500' />
					</ul>
				)}
				<span className='font-bold'>
					{conversations_list.length > 0 ? `Conversations` : `No conversations`}
				</span>
				<ul className='ml-1 overflow-auto'>
					{conversations_list.length > 0 &&
						conversations_list.map((conversation) => (
							<li
								key={conversation.with.id}
								className='flex items-center py-1 rounded hover:bg-slate-300 text-sm cursor-pointer'
								onClick={() => handleUserSelect(conversation.with)}
							>
								<img
									className='w-8 h-8 rounded-full mr-2 border-2 border-amber-500 shadow-2xl'
									src={conversation.with.image || '/avatar.jpg'}
									alt='avatar'
								/>
								<span>{`${conversation.with.first_name} ${conversation.with.last_name}`}</span>
								{conversation.unread > 0 && (
									<span className='ml-1 bg-red-600 rounded-full py-0.5 px-1.5 text-xs font-bold'>
										{conversation.unread}
									</span>
								)}
							</li>
						))}
				</ul>
			</div>
			<div className='flex flex-col flex-grow bg-slate-100 dark:bg-slate-400'>
				<header className='py-2 pl-1 bg-slate-200 dark:bg-slate-800'>
					<h1 className='text-sm sm:text-xl font-bold text-center'>
						{selectedUser &&
						global.state.profile.team &&
						selectedUser.name === global.state.profile.team.name
							? `${global.state.profile.team.name} Team Chat`
							: selectedUser
							? `Conversation with ${selectedUser.first_name} ${selectedUser.last_name}`
							: `Conversations`}
					</h1>
				</header>
				<div className='flex-grow overflow-y-auto'>
					<ScrollContainer>
						{selectedUser &&
						global.state.profile.team &&
						selectedUser.name === global.state.profile.team.name &&
						teamMessages
							? teamMessages.map((message) => (
									<div
										key={message.id}
										className={`flex flex-col my-2 ml-1 rounded text-black ${
											message.sender_id === global.state.profile.id
												? 'bg-sky-200'
												: 'bg-gray-200'
										}`}
									>
										<div key={message.id} className='flex items-center p-1'>
											<img
												className='w-8 h-8 rounded-full mr-2 mb-1 border-2 border-amber-500 shadow-2xl'
												src={message.sender.image || '/avatar.jpg'}
												alt='avatar'
											/>
											<span className='text-xs font-bold'>
												{message.sender_id === global.state.profile.id
													? `You · ${message.created_at}`
													: `${message.sender.first_name} ${message.sender.last_name} · ${message.created_at}`}
											</span>
										</div>
										<p className='text-black rounded-lg my-1 ml-1'>
											{message.content}
										</p>
									</div>
							  ))
							: selectedUser && messages
							? messages.map((message) => {
									if (
										(message.sender_id === selectedUser.id &&
											message.receiver_id === global.state.profile.id) ||
										(message.receiver_id === selectedUser.id &&
											message.sender_id === global.state.profile.id)
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
												<div key={message.id} className='flex items-center p-1'>
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
													{!invited &&
														!selectedUser.team_id &&
														global.state.profile.team &&
														global.state.profile.team.leader_id ===
															global.state.profile.id &&
														message.content.includes(
															`${selectedUser.first_name} ${selectedUser.last_name} has requested to join ${global.state.profile.team.name}.`
														) && (
															<button
																className='bg-sky-700 px-2 py-2 rounded-lg text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
																onClick={handleInvite}
															>
																invite
															</button>
														)}
													{!global.state.profile.team && message.invitation && (
														<button
															className='bg-sky-700 px-2 py-2 rounded-lg text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
															onClick={handleAccept}
														>
															accept
														</button>
													)}
												</p>
											</div>
										)
									}
							  })
							: null}
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
							<label className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-primary'>
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
