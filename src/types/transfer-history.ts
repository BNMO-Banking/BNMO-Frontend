export default interface TransferHistory {
    ID: number;
    CreatedAt: Date;
    destination: string;
    currency: string;
    amount: number;
    converted_amount: number;
    status: string;
}
