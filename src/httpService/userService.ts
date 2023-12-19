import { SignInModel, SignUpModel } from "../models/authModels";
import { GET, POST } from "./service";

export const getUserService=()=>{
    return GET("/api/v1/user");
}

export const getUsersService=()=>{
    return GET("/api/v1/users");
}

export const signUpService=(data: SignUpModel)=>{
    return POST("/api/v1/auth/register", data);
}

export const signInService=(data: SignInModel)=>{
    return POST("/api/v1/auth/login", data);
}
export const logoutService=()=>{
    return POST("/api/v1/auth/logout",{});
}