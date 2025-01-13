import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { IProduct } from "../interfaces/product";
import { ICart } from "../interfaces/cart";

export default function ProductItem({ product }: { product: IProduct }) {
	const [productItem, setProductItem] = useState(product);
	const [showCounter, setShowCounter] = useState(false);
	const [count, setCount] = useState(0);
	const URL = "http://localhost:3001/cart";

	function handleRemoveProduct() {
		setCount((a) => a - 1);
	}

	function handleAddProduct() {
		setCount((a) => a + 1);
	}

	function handleCancel() {
		setShowCounter(false);
		setCount(0);
	}

	async function getCartByProductId() {
		const response = await fetch(URL + "?productId=" + productItem.id);
		const cart = await response.json();
		return cart;
	}

	async function addToCart(cartData: ICart) {
		try {
			const response = await fetch(URL, {
				method: "POST",
				body: JSON.stringify(cartData),
			});
			const result = await response.json();
			return result;
		} catch (error) {
			console.log(error);
		}
	}

	async function updateCart(cart: ICart[], cartData: ICart) {
		try {
			const cartToBeUpdated = {
				...cart[0],
				quantity: cart[0].quantity + cartData.quantity,
			};
			const response = await fetch(URL + "/" + cart[0].id, {
				method: "PUT",
				body: JSON.stringify(cartToBeUpdated),
			});
			const updatedCart = await response.json();
			return updatedCart;
		} catch (error) {
			console.log(error);
		}
	}

	async function handleAddToCart() {
		const newCart: ICart = {
			id: Date.now().toString(),
			productId: productItem.id!,
			quantity: count,
			productName: productItem.title,
		};
		try {
			const cart = await getCartByProductId();

			if (cart.length == 0) {
				const newCartItem = await addToCart(newCart);
				updateProduct(newCartItem);
			} else {
				const updatedCart = await updateCart(cart, newCart);
				if (updatedCart) updateProduct(newCart);
			}
		} catch (error) {
			console.log(error);
		}
		setShowCounter(false);
		setCount(0);
	}

	async function updateProduct(cartData: ICart) {
		const updatedProduct: IProduct = {
			...product,
			quantity: productItem.quantity - cartData.quantity,
		};
		await fetch(`http://localhost:3001/products/${productItem.id}`, {
			method: "PUT",
			body: JSON.stringify(updatedProduct),
		});

		setProductItem(updatedProduct);
	}
	return (
		<>
			<Card sx={{ width: 250, height: 350 }}>
				<CardMedia
					sx={{ height: 140 }}
					image={productItem.imgSrc}
					title="title"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{productItem.title}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{productItem.description}
					</Typography>
				</CardContent>

				<CardActions sx={{ justifyContent: "center" }}>
					{productItem.quantity == 0 ? (
						"out of stock"
					) : !showCounter ? (
						<Button
							variant="contained"
							onClick={() => setShowCounter(true)}
							fullWidth
						>
							Add to Cart
						</Button>
					) : (
						<Stack>
							<Stack direction="row" alignItems="center" spacing={2}>
								<IconButton onClick={handleRemoveProduct} disabled={count == 0}>
									<FaMinus />
								</IconButton>

								<Typography>{count}</Typography>
								<IconButton
									onClick={handleAddProduct}
									disabled={count >= productItem.quantity}
								>
									<FaPlus />
								</IconButton>
							</Stack>
							<Stack direction="row">
								<Button onClick={handleCancel}>Cancel</Button>
								<Button onClick={handleAddToCart} disabled={count == 0}>
									Add
								</Button>
							</Stack>
						</Stack>
					)}
				</CardActions>
			</Card>
		</>
	);
}
