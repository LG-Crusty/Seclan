import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { ApiError } from "../utils/apiError";
import type { Request, Response, NextFunction } from "express";

const checkActive = asyncHandler(async (req: Request, res: Response) => {
 const { data  } = req.body;
    
 if(!data){
   throw new ApiError(400 , "no value is present")
 }

 res.status(200).json( new ApiResponse( 200, "endpoint is working"))

});

export { checkActive };
