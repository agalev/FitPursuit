'use client'
import { useContext } from 'react'
import { GlobalState } from '../global-provider'

export default function Teams() {
	const global = useContext(GlobalState)

	return <div>Teams</div>
}
