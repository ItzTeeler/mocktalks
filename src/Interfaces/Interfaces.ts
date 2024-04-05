export interface IToken{
    token: string
}

export interface IUserInfo{
    username: string
    password: string
}

export interface IUserData{
    userId: number
    publicName: string
}

export interface IMockInterviewProps{
    date: string, 
    type: string, 
    questions: string, 
    language: string
    id?: number
}

export interface IEditProfileProps {
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProfileData {
    id: number,
    fullName: string,
    occupation: string,
    experienceLevel: string,
    jobInterviewLevel: string,
    locationed: string,
    profileImg: string
}