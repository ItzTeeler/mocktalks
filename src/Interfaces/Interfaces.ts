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
}