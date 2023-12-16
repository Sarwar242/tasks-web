export const isAuthenticated = (user:any) => {
    return user?.token?.length>0 ? true:false;
}