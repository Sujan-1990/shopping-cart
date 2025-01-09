import { ICart } from "./cart";

export interface IOrder {
	id: string;
	createdAt: Date;
	items: ICart[];
}
