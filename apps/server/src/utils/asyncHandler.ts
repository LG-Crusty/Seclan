import type { Request, Response, NextFunction } from "express";

type requestHandler = (req: Request, res: Response, next: NextFunction) => any;

const asyncHandler = (fn: requestHandler)=>{
 return (req: Request, res : Response, next: NextFunction) => {
   Promise.resolve(fn (req, res, next)).catch((err) => {
     next(err);
   });
 }
}

export {asyncHandler};