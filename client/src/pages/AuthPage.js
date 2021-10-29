import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const AuthPage = () => {
	const auth = useContext(AuthContext)
	const { loading, error, request, clearError } = useHttp()
	const message = useMessage()
	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	useEffect(() => {
		window.M.updateTextFields()
	}, [])

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message, clearError])

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const registerHandler = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})
			message(data.message)
		} catch (e) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form})
			auth.logIn(data.token, data.userId)
			// message(data.message)
		} catch (e) {}
	}

	return (
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Short lin</h1>
				<div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
          <div>
						<div className="input-field">
							<input
								type="text"
								placeholder="Enter email"
								id="email"
								name="email"
								className="self-yi"
								value={form.email}
								onChange={changeHandler}
							/>
							<label htmlFor="email">Email</label>
						</div>
						<div className="input-field">
							<input
								type="password"
								name="password"
								placeholder="Enter password"
								id="password"
								className="self-yi"
								value={form.password}
								onChange={changeHandler}
							/>
							<label htmlFor="password">Password</label>
						</div>
					</div>
        </div>
        <div className="card-action">
					<button
						className="self-mr10 btn yellow darken-4"
						onClick={loginHandler}
						disabled={loading}
					>
						Log in
					</button>
					<button
						className="btn grey lighten-1 black-text"
						onClick={registerHandler}
						disabled={loading}
					>
						Sign up
					</button>
        </div>
      </div>
			</div>
		</div>
	)
}