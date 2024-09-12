export class AdminSignup {
    name: string;
    email: string;
    password: string;
    rollInCompany: string

    constructor(
        name:string,
        email: string,
        password: string,
        rollInCompany: string
    ){
        this.name = name;
        this.email = email;
        this.password = password;
        this.rollInCompany = rollInCompany;
    }
}
