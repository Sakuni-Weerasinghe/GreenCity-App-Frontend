export type UserSignupForm = {
    firstname: string;
    lastname: string;
    contactnumber: string;
    email: string;
    addressline1: string;
    addressline2: string;
    addressline3: string;
    username: string;
    password: string;
    confirmpassword: string;
};

export type CenterSignupForm = {
    centername: string;
    contactnumber: string;
    email: string;
    addressline1: string;
    addressline2: string;
    addressline3: string;
    username: string;
    password: string;
    confirmpassword: string;
};

export type LoginForm = {
    username: string;
    password: string;
}

export type CollectionCenterData = {
    id: string;
    name: string;
    location: string;
    waste_type: string;
    image: string;
}

export type CollectionCenter_createForm = {
    name: string;
    waste_type: string;
    description: string;
    picture: File;
}


