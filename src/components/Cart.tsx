import {
	Button,
	IconButton,
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
import { IProduct } from "../interfaces/product";
import CartItem from "./CartItem";

export default function Cart() {
	const [cartList, setCartList] = useState([]);
	const [isOrderSuccess, setIsOrderSuccess] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/cart");
				const result = await response.json();
				setCartList(result);
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
			items: cartList,
		};

		await placeOrder(order);
		setIsOrderSuccess(true);
		resetCartItems();

		console.log("Data removed");
	}
	async function getProduct(cart: ICart) {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${cart.productId}`
			);
			const product = await response.json();
			const updatedProduct: IProduct = {
				...product,
				quantity: product.quantity + cart.quantity,
			};
			return updatedProduct;
		} catch (error) {
			console.log(error);
		}
	}
	async function updateProduct(product: IProduct) {
		try {
			await fetch(`http://localhost:3001/products/${product.id}`, {
				method: "PUT",
				body: JSON.stringify(product),
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteCart(cart: ICart) {
		try {
			await fetch(`http://localhost:3001/cart/${cart.id}`, {
				method: "DELETE",
			});
			setCartList(cartList.filter((x: ICart) => x.id != cart.id));
			const product = await getProduct(cart);
			product && updateProduct(product);
		} catch (error) {
			console.log(error);
		}
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
									<TableCell
										sx={{ display: "flex", justifyContent: "space-around" }}
									>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{cartList.map((item: ICart) => (
									<CartItem key={item.id} cart={item} deleteCart={deleteCart} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
					{cartList.length > 0 ? (
						<Button
							variant="contained"
							sx={{ width: "fit-content" }}
							onClick={order}
						>
							Place Order
						</Button>
					) : (
						"Cart is Empty"
					)}
				</>
			) : (
				<Typography variant="h2">Order Successfull</Typography>
			)}
		</Stack>
	);
}
