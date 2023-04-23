import React from 'react'

const SlideOver = (props: any) => {
  const selectedId = props.taskID
  const title = props.title
  const color = props.color
  return (
    <div className='fixed right-0 top-0 bottom-0 max-w-sm w-full bg-zinc-800 p-5 flex flex-col gap-y-4 '>
        <div className=' bg-zinc-700 p-3 rounded-md'>
            <p>
                {title}
            </p>
            
        </div>
        <div className=' bg-zinc-700 p-3 rounded-md'>
            <label htmlFor="notes" className='text-zinc-500 mb-2'>Add notez</label>
            <textarea id="notes" className='w-full bg-transparent outline-none h-fit'></textarea>
        </div>
    </div>
  )
}

export default SlideOver