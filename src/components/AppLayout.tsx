import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";

export default function AppLayout() {
	return (
		<>
			<Header />
			<Box sx={{ mx: 40, my: 10 }}>
				<Outlet />
			</Box>
		</>
	);
}
