import React from 'react'
import { CreateProfileModal } from '../Components/CreateProfileModal'
import { EditProfileModal } from '../Components/EditProfileModal'
import { ScheduleInterviewComponent } from '../Components/ScheduleInterviewComponent'


const TestPage = () => {
  return (
    <div>
      <h1>This is a test page</h1>
      <CreateProfileModal/>
      <EditProfileModal open={false} close={function (value: React.SetStateAction<boolean>): void {
        throw new Error('Function not implemented.')
      } }/>
      <ScheduleInterviewComponent/>
    </div>
  )
}

export default TestPage
