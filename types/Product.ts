export interface Product {
    id : string,
    name : string,
    price : number,
    image : string,
    installmentText: string
    discountPercent?: number
}