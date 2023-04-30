'use client'
import { useEffect } from 'react'
import { Collapse, Dropdown, initTE } from 'tw-elements'

initTE({ Collapse, Dropdown })

export default function Nav() {
	useEffect(() => {
		initTE({ Collapse, Dropdown })
	}, [])

	return (
		<nav
			className='flex flex-wrap relative w-full items-center justify-between bg-neutral-100 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start'
			data-te-navbar-ref
		>
			{/* <div className='flex w-full flex-wrap items-center justify-between px-3'> */}
				{/* <!-- Hamburger button for mobile view --> */}
				
				<button className='ml-4 md:hidden lg:hidden'
					data-te-collapse-init
					data-te-target='#navbarSupportedContent1'
					onClick={() =>
						document
							.querySelector('.animated-hamburger')
							.classList.toggle('open')
					}
					type='button'
					aria-controls='navbarSupportedContent1'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<div className='animated-hamburger'>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</button>

				{/* <!-- Collapsible navigation container --> */}
				<div
					className='!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto'
					id='navbarSupportedContent1'
					data-te-collapse-item
				>
					{/* <!-- Logo --> */}
					<a
						className='mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400'
						href='#'
					>
						<img
								src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
                style={{ height: '25px' }}
							alt=''
							loading='lazy'
						/>
					</a>
					{/* <!-- Left navigation links --> */}
					<ul
						className='list-style-none mr-auto flex flex-col pl-0 lg:flex-row'
						data-te-navbar-nav-ref
					>
						<li className='mb-4 lg:mb-0 lg:pr-2' data-te-nav-item-ref>
							{/* <!-- Dashboard link --> */}
							<a
								className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400'
								href='#'
								data-te-nav-link-ref
							>
								Dashboard
							</a>
						</li>
						{/* <!-- Team link --> */}
						<li className='mb-4 lg:mb-0 lg:pr-2' data-te-nav-item-ref>
							<a
								className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
								href='#'
								data-te-nav-link-ref
							>
								Team
							</a>
						</li>
						{/* <!-- Projects link --> */}
						<li className='mb-4 lg:mb-0 lg:pr-2' data-te-nav-item-ref>
							<a
								className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
								href='#'
								data-te-nav-link-ref
							>
								Projects
							</a>
						</li>
					</ul>
				</div>

				{/* <!-- Right elements --> */}
				<div className='relative flex items-center'>
					{/* <!-- Cart Icon --> */}
					<a
						className='mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
						href='#'
					>
						<span className='[&>svg]:w-5'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='currentColor'
								className='h-5 w-5'
							>
								<path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
							</svg>
						</span>
					</a>

					{/* <!-- Container with two dropdown menus --> */}
					<div className='relative' data-te-dropdown-ref>
						{/* <!-- First dropdown trigger --> */}
						<a
							className='hidden-arrow mr-4 flex items-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400'
							href='#'
							id='dropdownMenuButton1'
							role='button'
							data-te-dropdown-toggle-ref
							aria-expanded='false'
						>
							{/* <!-- Dropdown trigger icon --> */}
							<span className='[&>svg]:w-5'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='currentColor'
									className='h-5 w-5'
								>
									<path
										fill-rule='evenodd'
										d='M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z'
										clip-rule='evenodd'
									/>
								</svg>
							</span>
							{/* <!-- Notification counter --> */}
							<span className='absolute -mt-2.5 ml-2 rounded-[0.37rem] bg-danger px-[0.45em] py-[0.2em] text-[0.6rem] leading-none text-white'>
								1
							</span>
						</a>
						{/* <!-- First dropdown menu --> */}
						<ul
							className='absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block'
							aria-labelledby='dropdownMenuButton1'
							data-te-dropdown-menu-ref
						>
							{/* <!-- First dropdown menu items --> */}
							<li>
								<a
									className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30'
									href='#'
									data-te-dropdown-item-ref
								>
									Action
								</a>
							</li>
							<li>
								<a
									className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30'
									href='#'
									data-te-dropdown-item-ref
								>
									Another action
								</a>
							</li>
							<li>
								<a
									className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30'
									href='#'
									data-te-dropdown-item-ref
								>
									Something else here
								</a>
							</li>
						</ul>
					</div>

					{/* <!-- Second dropdown container --> */}
					<div className='relative' data-te-dropdown-ref>
						{/* <!-- Second dropdown trigger --> */}
						<a
							className='hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none'
							href='#'
							id='dropdownMenuButton2'
							role='button'
							data-te-dropdown-toggle-ref
							aria-expanded='false'
						>
							{/* <!-- User avatar --> */}
							<img
								src='https://tecdn.b-cdn.net/img/new/avatars/2.jpg'
								className='rounded-full'
								style={{ height: '25px', width: '25px' }}
								alt=''
								loading='lazy'
							/>
						</a>
						{/* <!-- Second dropdown menu --> */}
						<ul
							className='absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block'
							aria-labelledby='dropdownMenuButton2'
							data-te-dropdown-menu-ref
						>
							{/* <!-- Second dropdown menu items --> */}
							<li>
								<a
									className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30'
									href='#'
									data-te-dropdown-item-ref
								>
									Action
								</a>
							</li>
							<li>
								<a
									className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30'
									href='#'
									data-te-dropdown-item-ref
								>
									Another action
								</a>
							</li>
							<li>
								<a
									className='block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30'
									href='#'
									data-te-dropdown-item-ref
								>
									Something else here
								</a>
							</li>
						</ul>
					</div>
				</div>
			{/* </div> */}
		</nav>
	)
}
