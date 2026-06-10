import Layout from "./App"
import Login from "./pages/Login"
import Matcha from "./pages/Matcha"

const routes = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{ index: true, element: <Matcha />},
			{ path: "login", element: <Login />}
		],
	},
]

export default routes