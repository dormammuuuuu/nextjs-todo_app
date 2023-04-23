import React from 'react'
import LottieRender from './components/LottieRender'
import * as homePageLottie from './lotties/ManWithTask.json'

const HomePage = () => {
  // render the page [id].tsx
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <LottieRender src={homePageLottie} height="700px" width="700px"/>
    </div>
  )
  
}

export default HomePage