import { AbsoluteFill, Img, Series } from "remotion"
import React from "react"
import { MemoryPost } from "../../../utils/apiUtils"
import { durationInFrames } from "./Root"

export const MyComposition: React.FC<{ posts: MemoryPost[] }> = ({ posts }) => {
  return (
    <AbsoluteFill
      style={{
        fontSize: 30,
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Series>
        {posts.map((post: MemoryPost) => (
          <Series.Sequence durationInFrames={durationInFrames} key={post.id}>
            <Img
              placeholder=""
              key={post.id}
              alt="primary"
              src={post.primary.url}
            />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  )
}
