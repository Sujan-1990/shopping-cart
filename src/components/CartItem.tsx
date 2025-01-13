import { Button, IconButton, Stack, TableCell, TableRow } from "@mui/material";
import { ICart } from "../interfaces/cart";
import { useState } from "react";

export default function CartItem({
	cart,
	deleteCart,
}: {
	cart: ICart;
	deleteCart: any;
}) {
	const [cartItem, setCartItem] = useState(cart);
	const [edit, setEdit] = useState(false);
	const [count, setCount] = useState(cartItem.quantity);

	function handleRemoveQuantity() {
		setCount((a) => a - 1);
	}
	function handleAddQuantity() {
		setCount((a) => a + 1);
	}
	function handleCancel() {
		setEdit(false);
		setCount(cartItem.quantity);
	}

	async function handleSave() {
		try {
			const payload: ICart = {
				...cartItem,
				quantity: count,
			};
			const response = await fetch(
				`http://localhost:3001/cart/${cartItem.id}`,
				{
					method: "PUT",
					body: JSON.stringify(payload),
				}
			);
			const result = await response.json();
			updateProduct();
			setEdit(false);
			setCartItem(result);
		} catch (error) {}
	}

	async function updateProduct() {
		try {
			const product = await getProduct();
			if (product) {
				const countDiff = cartItem.quantity - count;
				const payload = {
					...product,
					quantity: product.quantity + countDiff,
				};

				await fetch(`http://localhost:3001/products/${cartItem.productId}`, {
					method: "PUT",
					body: JSON.stringify(payload),
				});
			}
		} catch (error) {}
	}

	async function getProduct() {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${cartItem.productId}`
			);
			const result = await response.json();
			return result;
		} catch (error) {}
	}

	return (
		<TableRow key={cartItem.id}>
			<TableCell>{cartItem.productName}</TableCell>
			<TableCell>
				{!edit ? (
					cartItem.quantity
				) : (
					<Stack direction="row" alignItems="center">
						<IconButton onClick={handleRemoveQuantity} disabled={count == 0}>
							-
						</IconButton>
						{count}
						<IconButton onClick={handleAddQuantity}>+</IconButton>
					</Stack>
				)}
			</TableCell>
			<TableCell sx={{ display: "flex", justifyContent: "space-around" }}>
				{!edit ? (
					<Button
						variant="contained"
						color="info"
						onClick={() => setEdit(true)}
					>
						Edit
					</Button>
				) : (
					<Stack direction="row" spacing={2}>
						<Button variant="contained" color="primary" onClick={handleSave}>
							Save
						</Button>
						<Button variant="contained" color="error" onClick={handleCancel}>
							Cancel
						</Button>
					</Stack>
				)}
				<Button
					variant="contained"
					color="error"
					sx={{ ml: 4 }}
					onClick={() => deleteCart(cart)}
				>
					Delete
				</Button>
			</TableCell>
		</TableRow>
	);
}
