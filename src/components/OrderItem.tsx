import { Box, Button, Stack, Typography } from "@mui/material";
import { IOrder } from "../interfaces/order";
import { useState } from "react";

export default function OrderItem({ order }: { order: IOrder }) {
	const [showItem, setShowItem] = useState(false);

	return (
		<Box
			width={350}
			sx={{ padding: 3, border: "1px solid grey", borderRadius: 2 }}
		>
			<Stack key={order.id}>
				<Typography variant="h6">Order ID: {order.id}</Typography>
				<Typography variant="body2">
					Ordered Date: {order.createdAt.toString()}
				</Typography>
				<Button
					variant="outlined"
					sx={{ mb: 1 }}
					onClick={() => setShowItem((a) => !a)}
				>
					{showItem ? "Hide" : "Show"} Items
				</Button>

				{showItem && (
					<Stack spacing={1}>
						{order.items.map((item) => (
							<Box
								key={item.id}
								sx={{ border: "1px solid gray", padding: 1, borderRadius: 2 }}
							>
								<Typography variant="body2">
									Product Name: {item.productName}
								</Typography>
								<Typography variant="body2">
									Quantity: {item.quantity}
								</Typography>
							</Box>
						))}
					</Stack>
				)}
			</Stack>
		</Box>
	);
}
