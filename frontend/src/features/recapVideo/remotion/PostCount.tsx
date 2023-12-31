import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion"
import React from "react"

export const PostCount: React.FC<{
  postCount: number
}> = ({ postCount }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const scale = spring({
    fps,
    frame,
  })

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        color: "white",
        fontSize: 80,
      }}
    >
      <div style={{ fontSize: "100px" }}>You have posted</div>
      <div style={{ transform: `scale(${scale})`, fontSize: "150px" }}>
        {postCount}
      </div>
      <div style={{ fontSize: "100px" }}>BeReals in 2023. Wow!</div>
    </AbsoluteFill>
  )
}

export default PostCount
