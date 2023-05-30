export default interface RequestHistory {
    ID: number;
    CreatedAt: Date;
    request_type: string;
    currency: string;
    amount: number;
    converted_amount: number;
    status: string;
}
