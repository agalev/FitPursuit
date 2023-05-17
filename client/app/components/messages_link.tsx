'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function MessagesLink() {
	const pathname = usePathname()
	const [unread, setUnread] = useState(null)
	useEffect(() => {
		if (pathname !== '/messages') {
			fetch('/api/messages/unread')
				.then((res) => res.json())
				.then((data) => setUnread(data.unread_count))
		}
	}, [pathname])

	return (
		<div className='relative inline-flex w-fit'>
			<Link
				className={`${
					pathname === '/messages' ? 'link-underline-active' : 'link-underline'}
				 sm:text-sm md:text-base lg:text-lg mr-3 my-2`}
				href={'/messages'}
				data-te-nav-link-ref
				onClick={() => setUnread(0)}
			>
				{unread > 0 && (
					<div className='absolute bottom-auto left-auto right-0 top-1 z-10 inline-block whitespace-nowrap rounded-full bg-red-700 px-1 py-0.5 text-center align-baseline text-xs font-bold leading-none text-white'>
						{unread}
					</div>
				)}
				Messages
			</Link>
		</div>
	)
}
