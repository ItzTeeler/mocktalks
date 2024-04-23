export interface IToken{
    token: string
}

export interface IUserInfo{
    username: string
    password: string
}

export interface IUserData{
    id: number
    username: string
}

export interface IMockInterviewProps{
    date: string, 
    type: string, 
    questions: string, 
    language: string
    id?: number
}

export interface IEditProfileProps {
    isNotCreate: boolean,
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>;
    userInfoPass: {
        id: number
        username: string  
    }
}

export interface IAddAppointmentProps {
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProfileData {
    id: number,
    userId: number,
    fullName: string,
    occupation: string,
    experienceLevel: string,
    jobInterviewLevel: string,
    locationed: string,
    profileImg: string
}

export interface IPracticeData {
    id: number,
    pairingId: number,
    practiceInterview: string,
    typePractice: string,
    typeExperience: string,
    datePick: string,
    timePick: string
}