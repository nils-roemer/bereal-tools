import { AbsoluteFill, useCurrentFrame } from "remotion"
import React from "react"

export const TextFadeIn: React.FC<{
  text: string
}> = ({ text }) => {
  const frame = useCurrentFrame()

  const opacity = Math.min(1, frame / 40)

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
      <div style={{ opacity: opacity }}>{text}</div>
    </AbsoluteFill>
  )
}

export default TextFadeIn
