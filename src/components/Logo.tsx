import { IconProps } from '@radix-ui/react-icons/dist/types'
import React from 'react'


const Logo = () => {
    const Icons = {
        Logo: (props: IconProps) => (
          <svg width="201" height="200" viewBox="0 0 201 200" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
          <path fillRule="evenodd" clipRule="evenodd" d="M95.5617 0.0656363C42.3914 2.39581 0 46.2394 0 99.9841C0 117.339 4.42018 133.661 12.1961 147.887L76.3933 110.822V86.3456L97.4961 74.1618H95.5617V0.0656363ZM79.8269 115.605L80.3975 116.593L15.767 153.908C33.5475 181.63 64.6364 200 100.016 200C135.937 200 167.436 181.063 185.073 152.627L120.577 115.39L100.016 127.261L79.8269 115.605ZM200.032 99.9841C200.032 116.799 195.882 132.644 188.552 146.553L123.639 109.075V86.3456L102.536 74.1618H102.562V0C156.622 1.35069 200.032 45.598 200.032 99.9841ZM100.016 127.37L105.37 130.462V136.644L100.016 139.736L94.6614 136.644V130.462L100.016 127.37ZM76.2748 80.1628L70.9204 77.0714L65.5659 80.1628V86.3456L70.9204 89.437L76.2748 86.3456V80.1628ZM129.111 77.0714L134.466 80.1628V86.3456L129.111 89.437L123.757 86.3456V80.1628L129.111 77.0714Z" fill="currentColor"/>
          </svg>
        )
    }

    return (
        <div className="flex items-center cursor-pointer"><Icons.Logo className="h-5 w-5 fill-secondary"/><span className="text-xl font-semibold">neLink</span></div>
    )
}

export default Logo