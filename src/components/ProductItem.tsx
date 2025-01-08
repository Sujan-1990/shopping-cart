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
	const [showCounter, setShowCounter] = useState(false);
	const [count, setCount] = useState(0);

	// function showProductCounter() {
	// 	setShowCounter(true);
	// }

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
	async function handleAddToCart() {
		setShowCounter(false);
		setCount(0);
		const cartData: ICart = {
			id: Date.now().toString(),
			productId: product.id!,
			quantity: count,
			productName: product.title,
		};
		try {
			const response = await fetch("http://localhost:3001/cart", {
				method: "POST",
				body: JSON.stringify(cartData),
			});
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			<Card sx={{ width: 250, height: 350 }}>
				<CardMedia sx={{ height: 140 }} image={product.imgSrc} title="title" />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{product.title}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{product.description}
					</Typography>
				</CardContent>

				<CardActions sx={{ justifyContent: "center" }}>
					{!showCounter ? (
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
								<IconButton onClick={handleRemoveProduct} disabled={count <= 0}>
									<FaMinus />
								</IconButton>

								<Typography>{count}</Typography>
								<IconButton onClick={handleAddProduct}>
									<FaPlus />
								</IconButton>
							</Stack>
							<Stack direction="row">
								<Button onClick={handleCancel}>Cancel</Button>
								<Button onClick={handleAddToCart}>Add</Button>
							</Stack>
						</Stack>
					)}
				</CardActions>
			</Card>
		</>
	);
}
