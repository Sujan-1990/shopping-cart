import { Button, Stack, Typography } from "@mui/material";

export default function Delete() {
	return (
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
	);
}
