import { NextFunction, Request, Response } from 'express';

function authenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): Response | void {
    if (
        !request.session.user ||
        request.session.authType !== process.env.SESSION_AUTHTYPE
    ) {
        return response.status(401).json({
            message: 'USER NOT AUTHENTICATED',
        });
    }
    next();
}

export { authenticated };
