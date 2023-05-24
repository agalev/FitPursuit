'use client'
import React, { useState, useEffect } from 'react'

export default function Countdown(targetDate, onEnd) {
	const [countdown, setCountdown] = useState('')

	useEffect(() => {
		const calculateRemainingTime = () => {
			const now = new Date().getTime()

			const target = new Date(targetDate).getTime()
			if (isNaN(target)) {
				return 'Enter a date'
			}

			const difference = target - now

			if (difference <= 0) {
				return onEnd
			}

			const days = Math.floor(difference / (1000 * 60 * 60 * 24))
			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			)
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((difference % (1000 * 60)) / 1000)

			return `${days}d ${hours}h ${minutes}m ${seconds}s`
		}

		setCountdown(calculateRemainingTime())

		const interval = setInterval(() => {
			const updatedCountdown = calculateRemainingTime()
			setCountdown(updatedCountdown)
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [targetDate])

	return <>{countdown}</>
}
