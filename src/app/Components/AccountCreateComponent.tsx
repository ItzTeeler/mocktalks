import React from 'react'

const AccountCreateComponent = (props: {show: string; text: string;}) => {

    return (
        <div className={`${props.show}`}>
            <div className='absolute flex justify-center min-w-full mt-5 left-0 top-0'>
                <div className='bg-white border border-black rounded-[10px] px-[50px] py-[20px]'>
                    <p>{props.text}</p>
                </div>
            </div>
        </div>
    )
}

export default AccountCreateComponent
