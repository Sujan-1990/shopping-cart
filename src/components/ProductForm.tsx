import {
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { IProduct } from "../interfaces/product";

export default function ProductForm({
	handleClose,
	selectedProduct,
	handleFormData,
}: {
	handleClose: any;
	selectedProduct: IProduct | null | undefined;
	handleFormData: any;
}) {
	const [name, setName] = useState(selectedProduct?.title ?? "");
	const [price, setPrice] = useState(selectedProduct?.price ?? "");
	const [description, setDescription] = useState(
		selectedProduct?.description ?? ""
	);
	const [link, setLink] = useState(selectedProduct?.imgSrc ?? "");
	const [available, setAvailable] = useState(
		selectedProduct?.available ?? false
	);
	const [quantity, setQuantity] = useState(selectedProduct?.quantity ?? "0");

	async function submitFormData(e: any) {
		e.preventDefault();
		const data: IProduct = {
			id: selectedProduct?.id ?? Date.now().toString(),
			title: name,
			description: description,
			imgSrc: link,
			price: +price,
			available: available,
			quantity: +quantity,
		};
		if (selectedProduct) {
			editProduct(data);
		} else addProduct(data);
		handleClose();
	}

	async function addProduct(data: IProduct) {
		try {
			const response = await fetch("http://localhost:3001/products", {
				method: "POST",
				body: JSON.stringify(data),
			});
			const result = await response.json();

			handleFormData(result);
		} catch (error) {
			console.log(error);
		}
	}

	async function editProduct(data: IProduct) {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${data.id}`,
				{
					method: "PUT",
					body: JSON.stringify(data),
				}
			);
			const result = await response.json();
			handleFormData(result);
		} catch (error) {
			console.log(error);
		}
	}

	function handleAvailability(e: any) {
		if (!e.target.checked) {
			setQuantity(0);
		}

		setAvailable(e.target.checked);
	}

	return (
		<form onSubmit={(e) => submitFormData(e)}>
			<Stack spacing={2} mt={1}>
				<TextField
					id="name"
					label="Name"
					variant="outlined"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<TextField
					id="price"
					label="Price"
					variant="outlined"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
					type="number"
				/>
				<TextField
					id="description"
					label="Description"
					variant="outlined"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
				<TextField
					id="imageLink"
					label="Image Link"
					variant="outlined"
					value={link}
					onChange={(e) => setLink(e.target.value)}
					required
				/>
				<FormControlLabel
					control={<Checkbox checked={available} />}
					label="Available"
					onChange={(e: any) => handleAvailability(e)}
				/>
				{available && (
					<TextField
						id="quantity"
						label="Quantity"
						type="number"
						variant="outlined"
						value={quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				)}
				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						color="error"
						fullWidth
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button variant="contained" color="primary" fullWidth type="submit">
						{selectedProduct?.id ? "Update" : "Add"}
					</Button>
				</Stack>
			</Stack>
		</form>
	);
}
