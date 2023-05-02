'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Collapse, Dropdown, initTE } from 'tw-elements'

export default function Nav() {
	useEffect(() => {
		initTE({ Collapse, Dropdown })
	}, [])

	return (
		<nav
			className='flex flex-wrap sticky top-0 z-50 w-full items-center justify-between backdrop-blur-sm py-1'
			data-te-navbar-ref
		>
			<Link className='mx-2' href='/'>
				<picture>
					<source
						srcSet='/500x200_amber.svg'
						media='(prefers-color-scheme: dark)'
					/>
					<Image src='/500x200_black.svg' width={100} height={40} alt='' />
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
					<Link
						className='link-underline px-2'
						href='/login'
						data-te-nav-link-ref
					>
						Login
					</Link>
					<Link
						className='link-underline px-2'
						href='/signup'
						data-te-nav-link-ref
					>
						Signup
					</Link>
				</section>
			</div>
		</nav>
	)
}
