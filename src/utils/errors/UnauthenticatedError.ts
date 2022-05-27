import { ClientError } from "./ClientError";

export class UnauthenticatedError extends ClientError {
    constructor(data: {message: string, error: string}) {
        super(401, data);
    }
}