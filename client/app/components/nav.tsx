'use client'
import { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { GlobalState } from '../global-provider'
import CheckAuth from '../hooks/check_auth'
import MessagesLink from './messages_link'

export default function Nav() {
	CheckAuth()
	const pathname = usePathname()

	const global = useContext(GlobalState)

	const links = !global.state.isLoggedIn
		? [
				{ label: 'Home', href: '/' },
				{ label: 'Login', href: '/login' },
				{ label: 'Signup', href: '/signup' }
		  ]
		: [
				{ label: 'Home', href: '/' },
				{ label: 'Teams', href: '/teams' },
				{ label: 'Competitions', href: '/competitions' },
				{ label: 'Dashboard', href: '/dashboard' }
		  ]

	const handleLogout = () => {
		fetch('/api/logout', {
			method: 'POST'
		})
			.then(() => global.dispatch({ type: 'LOGOUT' }))
			.then(() => {
				signOut({ callbackUrl: '/' })
			})
	}

	useEffect(() => {
		async function init() {
			const te = await import('tw-elements')
			await te.initTE({ Collapse: te.Collapse })
		}
		init()
	}, [])

	return (
		<nav
			className='flex flex-wrap sticky top-0 z-10 w-full items-center justify-between backdrop-blur-sm py-1'
			data-te-navbar-ref
		>
			<Link href='/'>
				<picture>
					<source
						srcSet='/svg/nav_logo_orange.svg'
						media='(prefers-color-scheme: dark)'
					/>
					<Image
						src='/svg/nav_logo_color.svg'
						width={200}
						height={40}
						alt=''
						priority
					/>
				</picture>
			</Link>
			<button
				className='ml-4 sm:hidden md:hidden lg:hidden'
				data-te-collapse-init
				data-te-target='#navbarSupportedContent'
				onClick={() =>
					document.querySelector('.animated-hamburger').classList.toggle('open')
				}
				type='button'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<div className='animated-hamburger'>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</button>
			<div
				className='!visible hidden flex-grow basis-[100%] items-center sm:!flex sm:basis-auto md:!flex md:basis-auto lg:!flex lg:basis-auto justify-end'
				id='navbarSupportedContent'
				data-te-collapse-item
			>
				<section
					className='flex flex-wrap flex-col sm:flex-row md:flex-row lg:flex-row items-center'
					data-te-navbar-nav-ref
				>
					{links.map(({ label, href }) => (
						<Link
							className={`${
								pathname === href ? 'link-underline-active' : 'link-underline'
							} sm:text-sm md:text-base lg:text-lg mr-3 my-2`}
							key={label}
							href={href}
							data-te-nav-link-ref
						>
							{label}
						</Link>
					))}
					{global.state.isLoggedIn && (
						<>
							<MessagesLink />
							<button
								className='link-underline sm:text-sm md:text-base lg:text-lg mr-2'
								data-te-nav-link-ref
								onClick={handleLogout}
							>
								Logout
							</button>
						</>
					)}
				</section>
			</div>
		</nav>
	)
}
