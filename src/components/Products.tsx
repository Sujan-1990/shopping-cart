import {
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IProduct } from "../interfaces/product";
import { CiEdit, CiTrash } from "react-icons/ci";
import DialogModal from "./DialogModal";

export default function Products() {
	const [productList, setProductList] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [title, setTitle] = useState("");

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

	function handleModal(type: string) {
		setOpenModal(true);
		switch (type) {
			case "add":
				setTitle("Add Product");
				break;

			case "edit":
				setTitle("Edit Product");
				break;

			case "delete":
				setTitle("Delete Product");
		}
	}
	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<>
			<Stack spacing={4}>
				<Typography variant="h3">Products List</Typography>
				<Button variant="contained" onClick={() => handleModal("add")}>
					Add
				</Button>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Quantity</TableCell>
								<TableCell>Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{productList.map((p: IProduct) => (
								<TableRow key={p.id}>
									<TableCell>{p.title}</TableCell>
									<TableCell>${p.price}</TableCell>
									{p.available == false ? (
										<TableCell>Out of Stock</TableCell>
									) : (
										<TableCell>{p.quantity}</TableCell>
									)}
									<TableCell>
										{/* <IconButton onClick={() => setOpenModal(true)}> */}
										<IconButton onClick={() => handleModal("edit")}>
											<CiEdit />
										</IconButton>
										<IconButton onClick={() => handleModal("delete")}>
											<CiTrash />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Stack>

			{openModal && (
				<DialogModal open closeDialog={handleClose} title={title}>
					{title === "Delete Product" ? (
						<Stack spacing={2}>
							<Typography>Do you want to delete this product?</Typography>
							<Stack direction="row" justifyContent="space-between" spacing={2}>
								<Button variant="contained" color="info" fullWidth>
									No
								</Button>
								<Button variant="contained" color="error" fullWidth>
									Delete
								</Button>
							</Stack>
						</Stack>
					) : (
						<form>
							<Stack spacing={2} mt={1}>
								<TextField id="name" label="Name" variant="outlined" />
								<TextField id="price" label="Price" variant="outlined" />
								<TextField
									id="descriptin"
									label="Description"
									variant="outlined"
								/>
								<FormControlLabel control={<Checkbox />} label="Available" />

								<TextField
									id="quantity"
									label="Quantity"
									type="number"
									variant="outlined"
								/>
								<Stack direction="row" spacing={2}>
									<Button variant="contained" color="error" fullWidth>
										Cancel
									</Button>
									<Button variant="contained" color="primary" fullWidth>
										Submit
									</Button>
								</Stack>
							</Stack>
						</form>
					)}
				</DialogModal>
			)}
		</>
	);
}
