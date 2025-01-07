import { Button, Stack, Typography } from "@mui/material";

export default function Delete({
	// selectedProduct,
	handleDelete,
	handleClose,
}: {
	// selectedProduct: IProduct;
	handleDelete: any;
	handleClose: any;
}) {
	// async function deleteProduct() {
	// 	try {
	// 		const result = await fetch(
	// 			`http://localhost:3001/products/${selectedProduct.id}`,
	// 			{
	// 				method: "DELETE",
	// 			}
	// 		);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	handleClose();
	// }

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
					onClick={handleDelete}
				>
					Delete
				</Button>
			</Stack>
		</Stack>
	);
}
