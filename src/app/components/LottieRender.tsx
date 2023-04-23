'use client'
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const LottieRender = (props: any) => {
  return (
    <div>
        <Player
        autoplay
        loop
        src={props.src}
        style={{ height: props.height, width: props.width }}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>
    </div>
  )
}

export default LottieRender