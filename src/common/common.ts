export const isAuthenticated = (token:any) => {
    return token?.length>0 ? true:false;
}