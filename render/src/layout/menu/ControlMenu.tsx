function ControlMenu() {
	return (
		<div id="app-menu-bar" role="menubar" aria-label="Application menu">
			<div className="toolbar-dropdown closed" role="menuitem" aria-expanded="false">
				<div className="toolbar-button">
					<button className="button-component" type="button" tabIndex={-1}>
						<div className="menu-item">
							<div className="label">
								<span aria-label="File">
									<span aria-hidden="true" className="access-key">
										F
									</span>
									<span aria-hidden="true">ile</span>
								</span>
							</div>
						</div>
					</button>
				</div>
			</div>
			<div className="toolbar-dropdown closed" role="menuitem" aria-expanded="false">
				<div className="toolbar-button">
					<button className="button-component" type="button" tabIndex={-1}>
						<div className="menu-item">
							<div className="label">
								<span aria-label="Edit">
									<span aria-hidden="true" className="access-key">
										E
									</span>
									<span aria-hidden="true">dit</span>
								</span>
							</div>
						</div>
					</button>
				</div>
			</div>
			<div className="toolbar-dropdown closed" role="menuitem" aria-expanded="false">
				<div className="toolbar-button">
					<button className="button-component" type="button" tabIndex={-1}>
						<div className="menu-item">
							<div className="label">
								<span aria-label="View">
									<span aria-hidden="true" className="access-key">
										V
									</span>
									<span aria-hidden="true">iew</span>
								</span>
							</div>
						</div>
					</button>
				</div>
			</div>
			<div className="toolbar-dropdown closed" role="menuitem" aria-expanded="false">
				<div className="toolbar-button">
					<button className="button-component" type="button" tabIndex={-1}>
						<div className="menu-item">
							<div className="label">
								<span aria-label="Repository">
									<span aria-hidden="true" className="access-key">
										R
									</span>
									<span aria-hidden="true">epository</span>
								</span>
							</div>
						</div>
					</button>
				</div>
			</div>
			<div className="toolbar-dropdown closed" role="menuitem" aria-expanded="false">
				<div className="toolbar-button">
					<button className="button-component" type="button" tabIndex={-1}>
						<div className="menu-item">
							<div className="label">
								<span aria-label="Branch">
									<span aria-hidden="true" className="access-key">
										B
									</span>
									<span aria-hidden="true">ranch</span>
								</span>
							</div>
						</div>
					</button>
				</div>
			</div>
			<div className="toolbar-dropdown closed" role="menuitem" aria-expanded="false">
				<div className="toolbar-button">
					<button className="button-component" type="button" tabIndex={-1}>
						<div className="menu-item">
							<div className="label">
								<span aria-label="Help">
									<span aria-hidden="true" className="access-key">
										H
									</span>
									<span aria-hidden="true">elp</span>
								</span>
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}

export default ControlMenu
