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
    location: string;
    username: string;
    password: string;
    confirmpassword: string;
};

export type LoginForm = {
    username: string;
    password: string;
}

export type CollectionCenterData = {
    username: string;
    centerName: string;
    location: string;
    wastetype: string;
    image: string;
}

export type CollectionCenter_addDetailForm = {
    wastetype: string;
    payment: number;
    description: string;
    picture: FileList;
    working_days: [];
}

export type Customer_updateForm = {
    currentUserName: string;
    firstname: string;
    lastname: string;
    contactnumber: string;
    email: string;
    addressline1: string;
    addressline2: string;
    addressline3: string;
    username: string;
    picture: FileList;
    status: string;
}

export type CollectionCenter_updateForm = {
    currentUserName: string;
    centername: string;
    contactnumber: string;
    email: string;
    addressline1: string;
    addressline2: string;
    addressline3: string;
    location: string;
    username: string;
    picture: FileList;
    wastetype: string;
    payment: number;
    description: string;
    working_days: [];
    status: string;
}

export type CollectionRequest = {
    addressline1: string;
    addressline2: string;
    addressline3: string;
    contactNumber: number;
    location: string;
    note: string;
    quantity: number;
    totalPayment: number;

}




