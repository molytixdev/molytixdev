import { Request, Response, NextFunction } from 'express';

export function loggingHandler(req: Request, res: Response, next: NextFunction) {
    logging.log(`---> - [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.log(`<--- - [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
}
