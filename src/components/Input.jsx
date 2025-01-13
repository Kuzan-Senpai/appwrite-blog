import React from 'react'

const Input = React.forwardRef( function Input({
    label, 
    type = 'text',
    className= "",
    ...props},
    ref){
        return (
            <div className='w-fill'>
                {label && (
                    <label htmlFor={id} className='inline-block mb-1 pl-1'>
                        {label}
                    </label>
                )}
                <input type={type} ref={ref} {...props} id={id} />
            </div>
        )
    })


export default Input
