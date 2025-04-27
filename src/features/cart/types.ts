import { Pizza } from "../menu/types";

export interface CartItem extends Pizza {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
