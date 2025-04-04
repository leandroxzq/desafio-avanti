import github_1 from "../assets/github_1.png"
import github_2 from "../assets/github_2.png"

import styles from "../styles/Header.module.css"

export function Header() {
	return (
		<header className={styles.header}>
			<img src={github_1} alt="" />
			<h1>Perfil</h1>
			<img src={github_2} alt="" />
		</header>
	)
}
