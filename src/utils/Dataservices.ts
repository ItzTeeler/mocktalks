import { IAppointments, IMessages, IProfileData, IToken, IUserData, IUserInfo } from "@/Interfaces/Interfaces";

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

    return data;
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

export const createProfileItem = async (profileData: IProfileData) => {
    const res = await fetch(url + "/MT_Profile/CreateProfileItem", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(profileData)
    });

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    return data;
}

export const updateProfileItem = async (profileData: IProfileData) => {
    const res = await fetch(url + "/MT_Profile/UpdateProfileItem", {
        method: "PUT",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(profileData)
    });

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    return data;
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

export const getProfileItemByUserId = async (id: number) => {
    const res = await fetch(url + "/MT_Profile/GetProfileItemByUserId/" + id);
    const data = await res.json();
    sessionStorage.setItem("userName", String(data.fullName));
    return data;
}

export const getHardProfileItemByUserId = async (id: number) => {
    const res = await fetch(url + "/MT_Profile/GetProfileItemByUserId/" + id);
    const data = await res.json();
    sessionStorage.setItem("userName", String(data.fullName));
    return data;
}

export const createAppointment = async (appointment: IAppointments) => {
    const res = await fetch(url + '/MT_Schedule/CreateScheduledMeeting', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(appointment)
    });

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
}

export const getAppointments = async (userId: number) => {
    const res = await fetch(url + '/MT_Schedule/GetMeetingsByUserId/' + userId)
    const data = await res.json();
    return data;
}

export const getAppointmentsById = async (id: number) => {
    const res = await fetch(url + '/MT_Schedule/GetMeetingById/' + id)
    const data = await res.json();
    return data
}

export const updateAppointments = async (appointment: IAppointments) => {
    const res = await fetch(url + '/MT_Schedule/UpdateScheduleTime', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
    });

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();

    return data;
}

export const deleteAppointments = async (appointment: IAppointments) => {
    const res = await fetch(url + '/MT_Schedule/DeleteMeeting', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
    });

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();

    return data;
}

export const getAllAppointments = async () => {
    const res = await fetch(url + '/MT_Schedule/GetAllMeetings');
    const data = await res.json();
    return data;
}

export const postMessage = async (messagePass: IMessages) => {
    const res = await fetch(url + '/MT_Messaging/AddMessage', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(messagePass)
    });

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();

    return data;
}

export const GetAllMessages = async () => {
    const res = await fetch(url + '/MT_Messaging/GetAllMessages');

    if (!res.ok) {
        const message = "An error has Occurred " + res.status;
        throw new Error(message);
    }

    const data = await res.json();
    return data;
}