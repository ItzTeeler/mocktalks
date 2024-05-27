import { MouseEventHandler } from "react"

export interface IToken {
    token: string
}

export interface IUserInfo {
    username: string
    password: string
}

export interface IUserData {
    id: number
    userId: number
    username: string
}

export interface IMockInterviewProps {
    date: string,
    type: string,
    questions: string,
    language: string
    id?: number
}

export interface IEditProfileProps {
    setIsNotCreate: React.Dispatch<React.SetStateAction<boolean>>,
    setUserProfile: React.Dispatch<React.SetStateAction<IProfileData | undefined>>,
    isNotCreate: boolean,
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>;
    userInfoPass: string | null
}

export interface ICancelAppointmentProps {
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAddAppointmentProps {
    open: boolean,
    close: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IProfileData {
    id: number,
    userID: number,
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

export interface IAppointments {
    id: number,
    userID: number,
    partnerID: number,
    interviewPractice: string,
    typePractice: string,
    typeExperience: string,
    selectedDate: string,
    timezone: string,
    testQuestions: string,
    language: string,
    isPartnered: boolean,
    isDeleted: boolean
}

export interface ScheduleComponentProps {
    key: number;
    id: number;
    selectedDate: string;
    typePractice: string;
    testQuestions: string;
    language: string;
    time: string;
    submitBool: () => void;
}

export interface IAppointmentData {
    appointments: IAppointments[];
}

export interface IDropDownState {
    passUseState: React.Dispatch<React.SetStateAction<string>>;
    passUse: string;
}

export interface IDropZoneImage {
    setProfileImg: React.Dispatch<React.SetStateAction<string>>,
    profileImg: string
}

export interface IPropMessage {
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    sendMessage: (messageContainer: string) => Promise<void>,
    usersId: number,
    globalPartnerId: string,
    setAlertText: React.Dispatch<React.SetStateAction<string>>,
    setAlertBool: React.Dispatch<React.SetStateAction<string>>,
}

export interface IPropMessageSplitter {
    dataPass: IMessages
}

export interface IMessages {
    id: number,
    senderID: number,
    receiverID: number,
    text: string,
    dateSent: string,
    isDeleted: boolean
}

export interface IGChatCard {
    room: string,
    clickCheck: () => void,
    joinUp: (name: string, room: string) => void,
    namePass: string
    setGlobalPartnerId: React.Dispatch<React.SetStateAction<string>>
}

export interface IPeopleCard {
    room: string,
    clickCheck: () => void,
    joinUp: (name: string, room: string) => void,
    namePass: string
    setGlobalPartnerId: React.Dispatch<React.SetStateAction<string>>
}

export interface ISearchCard {
    allRooms: string[];
    setAllRooms: React.Dispatch<React.SetStateAction<string[] | undefined>>,
    room: string,
    clickCheck: () => void,
    joinUp: (name: string, room: string) => void,
    namePass: string,
    setGlobalPartnerId: React.Dispatch<React.SetStateAction<string>>
}