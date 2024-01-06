import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            isGuest: boolean;
        }
    }
}

export function isGuest(req: Request, res: Response, next: NextFunction) {
        const { token } = req.cookies;
        console.log(token);
        try {
                if (token) {
                        req.isGuest = false;
                } else {
                        req.isGuest = true;
                }
                next();
        } catch (error) {
                console.error(error);
                const status = (error as { status?: number }).status || 500;
                res.status(status).json({ error });
        }
}