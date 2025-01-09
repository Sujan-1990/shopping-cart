import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
	return (
		<Stack
			direction="row"
			spacing={5}
			alignItems="center"
			justifyContent="center"
		>
			<Box
				width={350}
				sx={{
					border: "1px solid grey",
					borderRadius: 2,
					padding: 2,
					display: "flex",
					alignItems: "center",
					gap: 4,
				}}
			>
				<Typography variant="h4" mb={2}>
					Login
				</Typography>
				<form>
					<Stack spacing={2}>
						<TextField
							id="email"
							label="Email"
							variant="outlined"
							type="email"
							required
						/>
						<TextField
							id="password"
							label="Password"
							variant="outlined"
							type="password"
							required
						/>
						<Button variant="contained">Submit</Button>
					</Stack>
				</form>
			</Box>
			<Typography variant="h6">OR</Typography>
			<Link to="/register">
				<Button variant="outlined" color="secondary">
					Register
				</Button>
			</Link>
		</Stack>
	);
}
