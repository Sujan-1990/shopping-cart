import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";
import { IUsers } from "../interfaces/users";

export default function AppLayout({
	authData,
	setAuthData,
}: {
	authData: IUsers | null;
	setAuthData: React.Dispatch<React.SetStateAction<IUsers | null>>;
}) {
	return (
		<>
			<Header authData={authData} setAuthData={setAuthData} />
			<Box
				sx={{
					mx: { xs: 5, lg: 10 },
					my: 10,
				}}
			>
				<Outlet />
			</Box>
		</>
	);
}
