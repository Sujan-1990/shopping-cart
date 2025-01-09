import {
	AppBar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
} from "@mui/material";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Header() {
	const [auth, setAuth] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setAuth(event.target.checked);
	// };

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
							<NavLink to="/login">
								<Button variant="outlined" color="warning">
									Login
								</Button>
							</NavLink>

							<Box>
								<IconButton onClick={handleMenu}>
									<FaRegCircleUser />
								</IconButton>
								{auth && (
									<Menu
										id="menu-appbar"
										anchorEl={anchorEl}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorEl)}
										onClose={handleClose}
									>
										<MenuItem>Profile</MenuItem>
										<MenuItem>My account</MenuItem>
									</Menu>
								)}
							</Box>
						</Stack>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
}
