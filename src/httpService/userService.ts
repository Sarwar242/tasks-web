import { SignInModel } from "../models/authModels";
import { POST } from "./service";

export const getUserService=(id:any)=>{
 return {};


}

export const signInService=(data: SignInModel)=>{
    return POST("/api/v1/auth/login", data);
}