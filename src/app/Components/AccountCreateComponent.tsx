import React from 'react'

const AccountCreateComponent = (props: {show: string; text: string;}) => {

    return (
        <div className={`${props.show}`}>
            <div className='grid grid-flow-row justify-center pt-10 pl-[8px] pr-[8px] pb-2 absolute w-full z-10'>
                <div className='bg-white border border-black rounded-[10px] px-[50px] py-[20px]'>
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default AccountCreateComponent
