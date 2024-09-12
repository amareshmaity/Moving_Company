export class UserSignup {
    name: string;
    age: string;
    email: string;
    mobile: string;
    password: string;

    // Address properties
    addressStreet: string;
    addressCity: string;
    addressState: string;

    constructor(
        name:string,
        age: string,
        email: string,
        mobile: string,
        password: string,
        addressStreet: string,
        addressCity: string,
        addressState: string
    ){
        this.name = name;
        this.age = age;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.addressStreet = addressStreet;
        this.addressCity = addressCity;
        this.addressState = addressState;
    }
}

