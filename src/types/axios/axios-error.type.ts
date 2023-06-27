import type { AxiosError } from "axios";

export default interface ErrorMessageType extends AxiosError {
    error: string;
}
