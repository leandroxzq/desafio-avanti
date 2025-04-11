import { useState, useEffect } from "react"
import { ArrowCircleLeft, ArrowCircleRight } from "@phosphor-icons/react"

import { Header } from "./components/Header"
import { Search } from "./components/Search"
import { User } from "./components/User"
import { Repos } from "./components/Repos"

import square from "./assets/square.png"
import ellipse from "./assets/ellipse_1.png"
import ellipse2 from "./assets/ellipse_2.png"

import styles from "./styles/User.module.css"
import "./App.css"

export function App() {
	const [user, setUser] = useState(null)

	const [repos, setRepos] = useState(null)
	const [repoLoading, setRepoLoading] = useState(false)

	const [input, setInput] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const [page, setPage] = useState(1)
	const [showProfileCard, setShowProfileCard] = useState(false)

	const handleInput = (e) => {
		setInput(e.target.value)
		setError("")
	}

	const removeFind = () => {
		setInput("")
		setUser(null)
		setRepos(null)
		setLoading(false)
		setShowProfileCard(false)
	}

	useEffect(() => {
		if (user) {
			fetchUserRepos()
		}
	}, [page])

	const fetchUserProfile = async () => {
		const response = await fetch(`https://api.github.com/users/${input}`)

		const data = await response.json()

		if (response.status === 404) {
			setError(
				"Nenhum perfil foi encontrado com esse nome de usuário. Tente novamente"
			)
			setUser(null)
			setShowProfileCard(false)
		} else {
			setUser(data)
			setShowProfileCard(true)
		}
	}

	const fetchUserRepos = async () => {
		setRepoLoading(true)

		const response = await fetch(
			`https://api.github.com/users/${input}/repos?per_page=2&page=${page}&sort=update&direction=desc`
		)

		const data = await response.json()

		if (data.length === 0) {
			invalidNext()
			return
		}

		setRepos(data)
		setRepoLoading(false)
	}

	const invalidNext = () => {
		setPage(page - 1)
	}

	const findHandleUser = async () => {
		setError("")
		setUser(null)
		setRepos(null)

		if (input === "") {
			setError("Por favor, insira um nome de usuário")
			return
		}

		setLoading(true)
		setShowProfileCard(true)

		try {
			await fetchUserProfile()
			await fetchUserRepos()
			setPage(1)
		} catch (e) {
			console.log(e.message)
			setShowProfileCard(false)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<img src={ellipse} alt="" className="ellipse" />
			<img src={ellipse2} alt="" className="ellipse2" />
			<main>
				<img src={square} alt="" className="square" />

				<Header />

				<Search
					value={input}
					handleInput={handleInput}
					placeholder="Digite um usuário do GitHub"
					loading={loading}
					findHandleUser={findHandleUser}
					removeText={removeFind}
				/>

				{error && (
					<div className="profile-card-error">
						<p className="error">{error}</p>
					</div>
				)}

				{showProfileCard && (
					<div className={`profile-card ${loading ? "" : ""}`}>
						{loading || !user ? (
							<>
								<div className={styles.user}>
									<div className="animation circle"></div>
									<div className={styles["user-info"]}>
										<div className="animation row"></div>
										<div className="animation row"></div>
									</div>
								</div>
								<Repos data={null} loading={true} />
							</>
						) : (
							<>
								<User user={user} />
								{repos && (
									<>
										<Repos
											data={repos}
											loading={repoLoading}
										/>
										<footer>
											<button
												onClick={() =>
													setPage(page - 1)
												}
												disabled={page === 1}
											>
												<ArrowCircleLeft size={32} />
											</button>
											<p>{page}</p>
											<button
												onClick={() =>
													setPage(page + 1)
												}
												disabled={repos.length < 1}
											>
												<ArrowCircleRight size={32} />
											</button>
										</footer>
									</>
								)}
							</>
						)}
					</div>
				)}
			</main>
		</>
	)
}
