import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode } from "react";

export default function DialogModal({
	open = false,
	closeDialog,
	title,
	children,
}: {
	open: boolean;
	closeDialog: any;
	title: string;
	children: ReactNode;
}) {
	return (
		<>
			<Dialog open={open} onClose={closeDialog}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>{children}</DialogContent>
			</Dialog>
		</>
	);
}
