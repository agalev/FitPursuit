'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { Ripple, Input, initTE } from 'tw-elements'

export default function Home() {
	useEffect(() => {
		initTE({ Ripple, Input })
	}, [])

	return (
		<main>
			<h1>FitPursuit</h1>
		</main>
	)
}
