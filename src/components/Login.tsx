import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Login({ setAuthData }: { setAuthData: any }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorUser, setErrorUser] = useState(false);
	const [localStorage, setLocalStorage] = useLocalStorage({}, "loggedInUser");
	const navigate = useNavigate();

	async function handleLogin(e: any) {
		e.preventDefault();
		const response = await fetch(
			`http://localhost:3001/users?email=${email}&password=${password}`
		);
		const user = await response.json();
		if (user.length > 0) {
			setLocalStorage(user[0]);
			setAuthData(user[0]);
			navigate("/");
		} else {
			setErrorUser(true);
		}
	}

	return (
		<Stack
			direction="row"
			spacing={5}
			alignItems="center"
			justifyContent="center"
		>
			<Stack spacing={2}>
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
					<form onSubmit={(e) => handleLogin(e)}>
						<Stack spacing={2}>
							<TextField
								id="email"
								label="Email"
								variant="outlined"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<TextField
								id="password"
								label="Password"
								variant="outlined"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<Button variant="contained" type="submit">
								Submit
							</Button>
						</Stack>
					</form>
				</Box>
				{errorUser && (
					<Box
						sx={{
							padding: 2,
							borderRadius: 3,
							background: "rgba(255, 0, 0, 0.3)",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<Typography variant="caption" color="error">
							Email/Password Incorrect
						</Typography>
					</Box>
				)}
			</Stack>
			<Typography variant="h6">OR</Typography>
			<Link to="/register">
				<Button variant="outlined" color="secondary">
					Register
				</Button>
			</Link>
		</Stack>
	);
}
