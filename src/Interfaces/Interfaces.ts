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

export interface IAddAppointmentProps {
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
        userId: number,
        partnerId: number,
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
    selectedDate: string;
    typePractice: string;
    testQuestions: string;
    language: string;
  }

  export interface IAppointmentData {
    appointments: IAppointments[];
  }