import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Header() {
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" color="info">
					<Toolbar sx={{ justifyContent: "space-between" }}>
						<NavLink to="/">
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
							>
								Logo
							</IconButton>
						</NavLink>
						<Stack direction="row" alignItems="center" spacing={1}>
							<Button color="inherit">
								<NavLink to="/products">Products</NavLink>
							</Button>
							<Button color="inherit">
								<NavLink to="/orders">Orders</NavLink>
							</Button>
							<IconButton>
								<NavLink to="/cart">
									<CiShoppingCart />
								</NavLink>
							</IconButton>
							<IconButton>
								<NavLink to="/login">
									<FaRegCircleUser />
								</NavLink>
							</IconButton>
						</Stack>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}
