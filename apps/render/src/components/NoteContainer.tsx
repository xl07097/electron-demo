interface NoteContainerProps {
	children?: React.ReactNode
	style?: React.CSSProperties
	className?: string
}

const NoteContainer: React.FC<NoteContainerProps> = ({ children }) => {
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
