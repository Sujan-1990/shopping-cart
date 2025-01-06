import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import PageNotFound from "./components/PageNotFound";
import Orders from "./components/Orders";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Products from "./components/Products";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
		// <>
		// 	<Header />
		// 	<Stack
		// 		direction="row"
		// 		spacing={2}
		// 		sx={{
		// 			mx: 20,
		// 			my: 10,
		// 		}}
		// 	>
		// 		<ProcuctList />
		// 	</Stack>
		// </>
	);
}

export default App;
