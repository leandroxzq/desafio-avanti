import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

import { CircleNotch } from "@phosphor-icons/react"

import styles from "../styles/Repos.module.css"

export function Repos({ data, loading }) {
	return (
		<>
			{loading ? (
				<ul className={styles.container}>
					<li className={styles.flex}>
						<CircleNotch className="loading" size={32} />
					</li>
					<li className={styles.flex}>
						<CircleNotch className="loading" size={32} />
					</li>
				</ul>
			) : data ? (
				<ul className={styles.container}>
					{data.map((repo) => (
						<li key={repo.id}>
							<a href={repo.html_url} target="_blank">
								<strong>
									🔗 {repo.name} ⭐ {repo.stargazers_count}
								</strong>
							</a>
							<small>
								Data de criação:{" "}
								{new Date(repo.created_at).toLocaleDateString()}
							</small>
							<p>{repo.description || "Sem descrição"}</p>
							<p>
								🖥️ Código principal escrito em:{" "}
								{repo.language || "Não informado"}
							</p>
							<small>
								Última atualização:{" "}
								{formatDistanceToNow(
									new Date(repo.updated_at),
									{
										locale: ptBR,
										addSuffix: true,
									}
								)}
							</small>
						</li>
					))}
				</ul>
			) : null}{" "}
		</>
	)
}
