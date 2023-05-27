export default function CompetitionModal({ details, close }) {
	console.log(details)
	return (
		<div className='fixed inset-0 flex items-center justify-center z-100'>
			<div className='bg-white rounded-lg p-6'>
				<h2 className='text-xl font-bold mb-4'>Modal Title</h2>
				<p className='mb-4'>Modal content goes here.</p>
				<button
					onClick={close}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Close
				</button>
			</div>
		</div>
	)
}
