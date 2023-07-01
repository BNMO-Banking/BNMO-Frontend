import { AxiosResponse } from "axios";

export interface SymbolsResponse extends AxiosResponse {
    symbols: Record<string, string>;
}
