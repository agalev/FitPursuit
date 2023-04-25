'use client'
import { useEffect } from 'react'
import { Carousel, Input, Ripple, initTE } from 'tw-elements'

export default function Signup() {
	useEffect(() => {
		initTE({ Carousel, Input, Ripple })
	}, [])

	return (
		<main
			className='relative'
			data-te-carousel-init
			data-te-carousel-slide
		>
			<div
				className='relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none'
				data-te-carousel-fade
				data-te-carousel-item
				data-te-carousel-active
			>
				<video
					src='https://tecdn.b-cdn.net/img/video/Lines.mp4'
					muted
					autoPlay
					loop
				/>
				<div className='absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block'>
					<div className='container h-full p-10'>
						<div className='g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200'>
							<div className='block rounded-lg bg-white shadow-lg dark:bg-neutral-800 dark:bg-opacity-75'>
								<div className='px-4 md:px-0 lg:px-40'>
									<div className='md:mx-6 md:p-12'>
										<div className='text-center'>
											<img
												className='mx-auto w-48'
												src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp'
												alt='logo'
											/>
											<h3>FitPursuit</h3>
											<h4 className='mb-12 mt-1 pb-1 text-xl font-semibold'>
											Competition Meets Community
											</h4>
										</div>

										<form>
											<p className='mb-4'>Please login to your account</p>
											<div className='relative mb-4' data-te-input-wrapper-init>
												<input
													type='text'
													className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
													id='exampleFormControlInput1'
													placeholder='Username'
												/>
												<label
													htmlFor='exampleFormControlInput1'
													className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'
												>
													Email address
												</label>
											</div>

											<div className='relative mb-4' data-te-input-wrapper-init>
												<input
													type='password'
													className='peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0'
													id='exampleFormControlInput11'
													placeholder='Password'
												/>
												<label
													htmlFor='exampleFormControlInput11'
													className='pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary'
												>
													Password
												</label>
											</div>

											<div className='mb-12 pb-1 pt-1 text-center'>
												<button
													className='mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
													type='button'
													data-te-ripple-init
													data-te-ripple-color='light'
													style={{
														backgroundImage:
														'linear-gradient(to right, #6a8eae, #7cb518, #94ecbe)'
															// 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)'
													}}
												>
													Log in
												</button>

											</div>
												<a href='#!'>Forgot password?</a>

											<div className='flex items-center justify-between pb-6'>
												<p className='mb-0 mr-2'>Don't have an account?</p>
												<button
													type='button'
													className='mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
													data-te-ripple-init
													data-te-ripple-color='light'
													style={{
														backgroundImage:
														'linear-gradient(to right, #6a8eae, #7cb518, #94ecbe)'}}
												>
													Register
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
