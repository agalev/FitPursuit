'use client'
import { useContext } from 'react'
import { GlobalState } from '../global-provider'

export default function Competitions() {
	const global = useContext(GlobalState)

	return <div>Competitions</div>
}
