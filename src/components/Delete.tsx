import { Button, Stack, Typography } from "@mui/material";
import { IProduct } from "../interfaces/product";

export default function Delete({
	selectedProduct,
	handleDelete,
	handleClose,
}: {
	selectedProduct: IProduct;
	handleDelete: any;
	handleClose: any;
}) {
	async function deleteProduct() {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${selectedProduct.id}`,
				{
					method: "DELETE",
				}
			);
			const result = await response.json();
			handleDelete(result);
		} catch (error) {
			console.log(error);
		}
		handleClose();
	}

	return (
		<Stack spacing={2}>
			<Typography>Do you want to delete this product?</Typography>
			<Stack direction="row" justifyContent="space-between" spacing={2}>
				<Button
					variant="contained"
					color="info"
					fullWidth
					onClick={handleClose}
				>
					No
				</Button>
				<Button
					variant="contained"
					color="error"
					fullWidth
					onClick={deleteProduct}
				>
					Delete
				</Button>
			</Stack>
		</Stack>
	);
}
