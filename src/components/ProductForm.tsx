import {
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";
import { useState } from "react";
import { IProduct } from "../interfaces/product";

export default function ProductForm({ handleClose }: { handleClose: any }) {
	const [inputName, setInputName] = useState("");
	const [inputPrice, setInputPrice] = useState("");
	const [inputDescription, setInputDescription] = useState("");
	const [inputImageLink, setImageInputLink] = useState("");
	const [available, setAvailable] = useState(false);
	const [inputQuantity, setInputQuantity] = useState("0");

	// const toggleCheckbox = () => {
	// 	setShowQuantity(true);
	// };

	async function submitFormData(e: any) {
		const data: IProduct = {
			id: Date.now(),
			title: inputName,
			description: inputDescription,
			imgSrc: inputImageLink,
			price: +inputPrice,
			available: available,
			quantity: +inputQuantity,
		};
		try {
			const result = await fetch("http://localhost:3001/products", {
				method: "POST",
				body: JSON.stringify(data),
			});
			console.log("submit successfull");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<form onSubmit={(e) => submitFormData(e)}>
			<Stack spacing={2} mt={1}>
				<TextField
					id="name"
					label="Name"
					variant="outlined"
					value={inputName}
					onChange={(e) => setInputName(e.target.value)}
				/>
				<TextField
					id="price"
					label="Price"
					variant="outlined"
					value={inputPrice}
					onChange={(e) => setInputPrice(e.target.value)}
				/>
				<TextField
					id="description"
					label="Description"
					variant="outlined"
					value={inputDescription}
					onChange={(e) => setInputDescription(e.target.value)}
				/>
				<TextField
					id="imageLink"
					label="Image Link"
					variant="outlined"
					value={inputImageLink}
					onChange={(e) => setImageInputLink(e.target.value)}
				/>
				<FormControlLabel
					control={<Checkbox />}
					label="Available"
					onChange={(e: any) => setAvailable(e.target.checked)}
				/>
				{available && (
					<TextField
						id="quantity"
						label="Quantity"
						type="number"
						variant="outlined"
						value={inputQuantity}
						onChange={(e) => setInputQuantity(e.target.value)}
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
						Submit
					</Button>
				</Stack>
			</Stack>
		</form>
	);
}
