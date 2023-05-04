'use client'
import { useEffect } from 'react'
import checkAuth from './hooks/check_auth'
import { Ripple, Input, initTE } from 'tw-elements'

export default function Home() {
	checkAuth()

	useEffect(() => {
		initTE({ Ripple, Input })
	}, [])

	return (
		<main>
			<h1>FitPursuit</h1>
		</main>
	)
}
