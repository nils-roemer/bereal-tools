import { AbsoluteFill } from "remotion"
import React from "react"

export const TextHeading: React.FC<{
  text: string
}> = ({ text }) => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        color: "white",
        fontSize: 110,
      }}
    >
      <div>{text}</div>
    </AbsoluteFill>
  )
}

export default TextHeading
