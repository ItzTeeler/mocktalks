import { IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces";

const url = "https://mocktalksapihosting.azurewebsites.net";
let userData: IUserData;

export const createAccount = async (createUser: IUserInfo) => {
    const res = await fetch(url + '/MT_User/NewUser', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(createUser)
    });

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
}

export const login = async (loginUser: IUserInfo) => {
    const res = await fetch(url + "/MT_User/Login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(loginUser)
    });
    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data: IToken = await res.json();
    return data;
}

export const getUserData = async (username: string) => {
    const res = await fetch(url + "/MT_User/GetUserByUserName/" + username);
    const data = await res.json();
    userData = data;
}

export const loggedInData = () => {
    return userData;
}

export const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem('Token');

    if (lsData != null) {
        result = true;
    }
    return result;
}

export const changePassword = async (username: string, password: string) => {

    const res = await fetch(`${url}/MT_User/UpdateUserPassword/${username}/${password}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        }
    });

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();

    return data;
}
