import { Carrito } from "../interfaces/carrito.interface";

export class User{

    constructor(
        public name: string,
        public lastname: string,
        public cedula: string,
        public phone: string,
        public email: string,
        public password: string,
        public address: string,
        public city: string,
        public department: string,
        public party_type: string,
        public referralCode: string,
        public referredBy: string,
        public walletBalance: number,
        public status: boolean,
        public fecha: Date,
        public carrito?: Carrito,
        public cid?: string,
        public _id?: string,
    ){}

}