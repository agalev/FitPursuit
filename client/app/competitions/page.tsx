'use client'
import { useContext } from 'react'
import { UserContext } from '../user-provider'

export default function Competitions() {
  const userData = useContext(UserContext)

	if (!userData.state.isLoggedIn) {
		return (
			<h1 className='flex justify-center text-3xl m-10'>
				You need to be signed in to access this page.
			</h1>
		)
	}
	return <div>Competitions</div>
}
