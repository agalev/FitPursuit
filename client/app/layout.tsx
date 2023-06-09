import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Nav from './components/nav'
import Footer from './components/footer'
import Providers from './providers'
import { DispatchProvider } from './global-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'FitPursuit',
	description: 'Join teams and compete with others for prizes!',
	type: 'website',
	keywords: 'fitness, competition, community, prizes',
	siteName: 'FitPursuit',
	locale: 'en_US'
}

export default function RootLayout({
	children,
	session
}: {
	children: React.ReactNode
	session: any
}) {
	return (
		<html lang='en'>
			<Analytics />
			<body
				className={`${inter.className} bg-slate-100 dark:text-amber-500 dark:bg-slate-900 transition-colors duration-300`}
			>
				<Providers session={session}>
					<DispatchProvider>
						<Nav />
						{children}
						<Footer />
					</DispatchProvider>
				</Providers>
			</body>
		</html>
	)
}
