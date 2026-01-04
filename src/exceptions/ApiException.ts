export class ApiException extends Error {
    public statusCode: number;
    public userMessage: string;

    constructor(statusCode: number, message: string | string[]) {
        const userMessage = Array.isArray(message) ? message[0] : message;
        super(userMessage);
        this.name = 'ApiException';
        this.statusCode = statusCode;
        this.userMessage = userMessage;
    }

    static fromResponse(statusCode: number, message: string | string[]): ApiException {
        return new ApiException(statusCode, message);
    }

    static unauthorized(): ApiException {
        return new ApiException(401, 'Please login to continue');
    }

    static networkError(): ApiException {
        return new ApiException(0, 'Network error. Please check your connection.');
    }
}
