export default interface RequestData {
    id: string;
    request_type: string;
    currency: string;
    amount: number;
    converted_amount: string;
    status: string;
    remarks: string;
    first_name: string;
    last_name: string;
    account_number: string;
    phone_number: string;
    created_at: Date;
}
