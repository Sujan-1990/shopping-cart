import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import PageNotFound from "./components/PageNotFound";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Products from "./components/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import { IUsers } from "./interfaces/users";
import { useLocalStorage } from "./hooks/useLocalStorage";
function App() {
	const [loggedInUser] = useLocalStorage({}, "loggedInUser");
	const [authData, setAuthData] = useState<IUsers | null>(loggedInUser || null);
	// console.log(loggedInUser, "loggedInUser");

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<AppLayout authData={authData} setAuthData={setAuthData} />}
				>
					<Route index element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/login" element={<Login setAuthData={setAuthData} />} />
					<Route path="/register" element={<Register />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
