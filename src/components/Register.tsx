import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { IUsers } from "../interfaces/users";

export default function Register() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");
	const [dob, setDob] = useState("");

	async function handleSubmit() {
		const userInformation: IUsers = {
			name: fullName,
			email: email,
			password: password,
			gender: gender,
			dob: new Date(dob),
		};
		try {
			const response = await fetch("http://localhost:3001/users", {
				method: "POST",
				body: JSON.stringify(userInformation),
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Stack
			direction="column"
			spacing={5}
			alignItems="center"
			justifyContent="center"
		>
			<Typography variant="h4">Register</Typography>
			<form onSubmit={handleSubmit}>
				<Stack
					spacing={2}
					sx={{
						width: 300,
						padding: 2,
						border: "1px solid grey",
						borderRadius: 2,
					}}
				>
					<TextField
						id="fullName"
						name="Full Name"
						label="Full Name"
						type="text"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						required
					/>
					<TextField
						id="email"
						name="Email"
						label="Email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<TextField
						id="password"
						name="Password"
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Gender *</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={gender}
							label="Gender"
							onChange={(e) => setGender(e.target.value)}
							required
						>
							<MenuItem key="male" value="male">
								Male
							</MenuItem>
							<MenuItem key="female" value="female">
								Female
							</MenuItem>
						</Select>
					</FormControl>

					<TextField
						id="dob"
						name="dob"
						type="date"
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						required
					/>
					<Button type="submit" variant="contained" color="secondary">
						Register
					</Button>
				</Stack>
			</form>
		</Stack>
	);
}
