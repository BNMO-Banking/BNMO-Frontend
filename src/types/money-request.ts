export default interface RequestMoney {
    ID: number;
    account_number: string;
    request_type: string;
    currency: string;
    amount: number;
    converted_amount: number;
}
