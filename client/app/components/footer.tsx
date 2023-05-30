import Link from 'next/link'
export default function Footer() {
	return (
		<footer className='flex items-center place-content-center'>
			&copy; {new Date().getFullYear()} FitPursuit • Powered by Strava •
			<Link href='/feedback' className='ml-1 underline'>
				Feedback Form
			</Link>
		</footer>
	)
}
