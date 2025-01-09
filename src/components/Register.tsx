import {
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
import { useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");
	const [role, setRole] = useState("");
	const [dob, setDob] = useState("");

	async function handleSubmit(e: any) {
		e.preventDefault();
		const userInformation: IUsers = {
			name: fullName,
			email: email,
			password: password,
			gender: gender,
			role: role,
			dob: new Date(dob),
		};
		try {
			await fetch("http://localhost:3001/users", {
				method: "POST",
				body: JSON.stringify(userInformation),
			});
			navigate("/login");
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
			<form onSubmit={(e) => handleSubmit(e)}>
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
						<InputLabel id="gender">Gender *</InputLabel>
						<Select
							labelId="gender"
							id="gender"
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
					<FormControl fullWidth>
						<InputLabel id="role">Role *</InputLabel>
						<Select
							labelId="role"
							id="role"
							value={role}
							label="Role"
							onChange={(e) => setRole(e.target.value)}
							required
						>
							<MenuItem key="customer" value="customer">
								Customer
							</MenuItem>
							<MenuItem key="admin" value="admin">
								Admin
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
