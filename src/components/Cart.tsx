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

export default function Cart() {
	const [cart, setCart] = useState([]);

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

	return (
		<Stack spacing={4}>
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
			<Button variant="outlined">Place Order</Button>
		</Stack>
	);
}
