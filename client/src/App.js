import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './hooks/routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'

function App() {
	const { logIn, logOut, token, userId, ready } = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	if (!ready) return <Loader />

	return (
		<AuthContext.Provider value={{
			token, logIn, logOut, userId, isAuthenticated
		}}>
			<Router>
				{ isAuthenticated && <Navbar/> }
				<div className="container">
					{routes}
				</div>
			</Router>
		</AuthContext.Provider>
	)
}

export default App