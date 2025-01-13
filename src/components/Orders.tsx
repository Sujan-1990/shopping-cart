import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IOrder } from "../interfaces/order";
import OrderItem from "./OrderItem";

export default function Orders() {
	const [orderList, setOrderList] = useState<IOrder[] | null>([]);

	useEffect(() => {
		const orderListData = async () => {
			try {
				const response = await fetch("http://localhost:3001/orders");
				const result = await response.json();
				setOrderList(result);
			} catch (error) {
				console.log(error);
			}
		};
		orderListData();
	}, []);

	return (
		<Stack spacing={2}>
			<Typography variant="h3">Orders</Typography>
			{orderList?.map((order: IOrder) => (
				<OrderItem key={order.id} order={order} />
			))}
		</Stack>
	);
}
