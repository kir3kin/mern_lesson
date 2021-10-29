import React from "react"
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from "../pages/AuthPage.js"
import { CreatePage } from "../pages/CreatePage.js"
import { DetailPage } from "../pages/DetailPage.js"
import { LinksPage } from "../pages/LinksPage.js"

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/links" exact >
					<LinksPage />
				</Route>
				<Route path="/create" exact >
					<CreatePage />
				</Route>
				<Route path="/detail/:id" >
					<DetailPage />
				</Route>
				<Redirect to="/create" />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/" exact >
				<AuthPage />
			</Route>
			<Redirect to="/" />
		</Switch>
	)
}