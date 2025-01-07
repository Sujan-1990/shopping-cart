import {
	Button,
	IconButton,
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
import { IProduct } from "../interfaces/product";
import { CiEdit, CiTrash } from "react-icons/ci";
import DialogModal from "./DialogModal";
import Delete from "./Delete";
import ProductForm from "./ProductForm";

export default function Products() {
	const [productList, setProductList] = useState<IProduct[]>([]);
	const [openModal, setOpenModal] = useState(false);
	const [title, setTitle] = useState("");
	const [selectedProduct, setSelectedProduct] = useState<IProduct | null>();

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

	function handleModal(type: string, product?: IProduct) {
		setOpenModal(true);
		setSelectedProduct(product);
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

	// async function deleteProduct() {
	// 	try {
	// 		const result = await fetch(
	// 			`http://localhost:3001/products/${selectedProduct!.id}`,
	// 			{
	// 				method: "DELETE",
	// 			}
	// 		);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	handleClose();
	// }

	function handleFormData(data: IProduct) {
		// console.log(data);

		const index = productList.findIndex(
			(product: IProduct) => product.id == data.id
		);
		if (index >= 0) {
			// const newProducts = productList.map((item: IProduct) => {
			// 	if (item.id === data.id) return data;
			// 	else return item;
			// });
			// setProductList(newProducts);

			const newArray = [...productList];
			newArray[index] = data;
			setProductList(newArray);
		} else {
			setProductList([...productList, data]);
		}
	}
	function handleDelete(data: IProduct) {
		console.log(data, "deletedData");
		console.log(productList, "productList");
		setProductList(
			productList.filter((product: IProduct) => product.id !== data.id)
		);
	}
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
										<IconButton onClick={() => handleModal("edit", p)}>
											<CiEdit />
										</IconButton>
										<IconButton onClick={() => handleModal("delete", p)}>
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
						<Delete
							selectedProduct={selectedProduct!}
							handleDelete={handleDelete}
							handleClose={handleClose}
						/>
					) : (
						<ProductForm
							selectedProduct={selectedProduct}
							handleClose={handleClose}
							handleFormData={handleFormData}
						/>
					)}
				</DialogModal>
			)}
		</>
	);
}
