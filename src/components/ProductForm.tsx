import {
	Button,
	Checkbox,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";

export default function ProductForm({ handleClose }: { handleClose: any }) {
	return (
		<form>
			<Stack spacing={2} mt={1}>
				<TextField id="name" label="Name" variant="outlined" />
				<TextField id="price" label="Price" variant="outlined" />
				<TextField id="descriptin" label="Description" variant="outlined" />
				<FormControlLabel control={<Checkbox />} label="Available" />

				<TextField
					id="quantity"
					label="Quantity"
					type="number"
					variant="outlined"
				/>
				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						color="error"
						fullWidth
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button variant="contained" color="primary" fullWidth>
						Submit
					</Button>
				</Stack>
			</Stack>
		</form>
	);
}
