import { MagnifyingGlass, CircleNotch, X } from "@phosphor-icons/react"

import styles from "../styles/Search.module.css"

export function Search({
	value,
	handleInput,
	placeholder,
	loading,
	findHandleUser,
	removeText,
}) {
	return (
		<div className={styles["search-container"]}>
			<input
				type="text"
				value={value}
				onChange={(e) => handleInput(e)}
				placeholder={placeholder}
				disabled={loading}
			/>
			{value !== "" && (
				<X
					style={{ cursor: "pointer" }}
					onClick={() => removeText()}
					size={25}
				/>
			)}
			<button onClick={() => findHandleUser()} disabled={loading}>
				{loading ? (
					<CircleNotch className="loading" size={25} />
				) : (
					<MagnifyingGlass size={25} />
				)}
			</button>
		</div>
	)
}
