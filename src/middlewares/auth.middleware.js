import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"

//req,_, :used when we are not using response in the function. we replace "res" by "_"

export const verifyJWT = asyncHandler(async(req,_,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")

        if(!token){
            throw new ApiError(401,"verifyJWT :: Unauthorized Request")
        }

        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401,"verifyJWT :: Invalid Access Token :: user not found")
        }
        req.user=user;
        next()

    } catch (error) {
        throw new ApiError(401,error?.message || "verifyJWT :: Invalid Access Token")
    }
})