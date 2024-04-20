const NoteContainer: React.FC<{
	children?: React.ReactNode
}> = ({ children }) => {
	return (
		<div
			style={{
				padding: '10px',
			}}
		>
			{children}
		</div>
	)
}

export default NoteContainer
