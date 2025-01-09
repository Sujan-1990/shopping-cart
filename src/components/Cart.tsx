import {
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ICart } from "../interfaces/cart";
import { IOrder } from "../interfaces/order";

export default function Cart() {
	const [cart, setCart] = useState([]);
	const [isOrderSuccess, setIsOrderSuccess] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/cart");
				const result = await response.json();
				setCart(result);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchData();
	}, []);

	async function placeOrder(order: IOrder) {
		await fetch("http://localhost:3001/orders", {
			method: "POST",
			body: JSON.stringify(order),
		});
	}
	async function resetCartItems() {
		const response = await fetch("http://localhost:3001/cart");
		const cartData = await response.json();

		const deletePromises = cartData.map((item: ICart) =>
			fetch(`http://localhost:3001/cart/${item.id}`, {
				method: "DELETE",
			})
		);

		await Promise.all(deletePromises);
	}

	async function order() {
		const order: IOrder = {
			id: Date.now().toString(),
			createdAt: new Date(),
			items: cart,
		};

		await placeOrder(order);
		setIsOrderSuccess(true);
		resetCartItems();

		console.log("Data removed");
	}

	return (
		<Stack spacing={4}>
			{!isOrderSuccess ? (
				<>
					<Typography variant="h2">Cart</Typography>
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Item Name</TableCell>
									<TableCell>Quantity</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cart.map((item: ICart) => (
									<TableRow key={item.id}>
										<TableCell>{item.productName}</TableCell>
										<TableCell>{item.quantity}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<Button
						variant="contained"
						sx={{ width: "fit-content" }}
						onClick={order}
					>
						Place Order
					</Button>
				</>
			) : (
				<Typography variant="h2">Order Successfull</Typography>
			)}
		</Stack>
	);
}
