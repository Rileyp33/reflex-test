import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

const Info = (props) => {
  return (
    <Svg width='20px' height='20px' viewBox='0 0 20 20' {...props}>
      <Path
        d='M104 503c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm.65 15.933c-.475.08-1.42.277-1.9.317-.406.034-.79-.199-1.024-.533a1.25 1.25 0 01-.15-1.144l1.89-5.198H101.5c-.002-1.083.81-1.88 1.85-2.185.496-.146 1.42-.346 1.9-.315.288.018.79.199 1.024.533.234.334.29.761.15 1.144l-1.89 5.198h1.965a2.213 2.213 0 01-1.849 2.183zm.6-9.683a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z'
        transform='translate(-94 -503)'
        fill={props.fill || '#10A367'}
        stroke='none'
        strokeWidth={1}
        fillRule='evenodd'
      />
    </Svg>
  )
}

export default Info
