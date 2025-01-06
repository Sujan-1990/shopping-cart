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

export default function ProductItem({ product }: { product: IProduct }) {
	const [showCounter, setShowCounter] = useState(false);
	const [count, setCount] = useState(1);

	function showProductCounter() {
		setShowCounter(true);
	}
	function handleRemoveProduct() {
		setCount((a) => a - 1);
	}
	function handleAddProduct() {
		setCount((a) => a + 1);
	}

	return (
		<>
			<Card sx={{ width: 250 }}>
				<CardMedia sx={{ height: 140 }} image={product.imgSrc} title="title" />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{product.title}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }}>
						{product.description}
					</Typography>
				</CardContent>

				<CardActions>
					{!showCounter ? (
						<Button variant="contained" onClick={showProductCounter} fullWidth>
							Add to Cart
						</Button>
					) : (
						<Stack direction="row" alignItems="center" spacing={2}>
							<IconButton onClick={handleRemoveProduct} disabled={count <= 0}>
								<FaMinus />
							</IconButton>

							<Typography>{count}</Typography>
							<IconButton onClick={handleAddProduct}>
								<FaPlus />
							</IconButton>
						</Stack>
					)}
				</CardActions>
			</Card>
		</>
	);
}
