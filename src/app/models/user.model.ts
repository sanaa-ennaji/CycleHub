
export interface User {
    id?: string ;
    email:string;
    password: string;
    firstName: string;
    address: string;
    phoneNumber:string;
    dateOfBirth: Date;
    profilePicture?: string;
    roleId?: number;   
}