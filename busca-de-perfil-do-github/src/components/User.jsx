import styles from "../styles/User.module.css"

export function User({ user }) {
	return (
		<div className={styles.user}>
			<img
				src={user.avatar_url}
				alt={`Foto do GitHub de ${user.login}`}
			/>
			<div className={styles["user-info"]}>
				<h1>{user.login}</h1>
				<p>{user.bio}</p>
			</div>
		</div>
	)
}
