'use client'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children, session }) {
	return (
		<SessionProvider session={session} basePath='/auth'>
			{children}
		</SessionProvider>
	)
}
