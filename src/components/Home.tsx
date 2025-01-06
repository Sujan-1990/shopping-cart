import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { IProduct } from "../interfaces/product";
import { Stack } from "@mui/material";

export default function Home() {
	const [productList, setProductList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/products");
				const result = await response.json();
				setProductList(result);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<Stack direction="row" spacing={1}>
			{productList?.map((p: IProduct) => (
				<ProductItem product={p} key={p.id} />
			))}
		</Stack>
	);
}
