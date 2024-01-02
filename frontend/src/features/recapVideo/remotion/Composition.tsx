import {
  AbsoluteFill,
  Img,
  Series,
  staticFile,
  Audio,
  interpolate,
} from "remotion"
import React from "react"
import { MemoryPost, UserData } from "../../../utils/apiUtils"
import { durationInFrames } from "./Root"
import HelloFadeIn from "./HelloFadeIn"
import PostCount from "./PostCount"
import TextFadeIn from "./TextFadeIn"
import TextHeading from "./TextHeading"

export const MyComposition: React.FC<{
  posts: MemoryPost[]
  userData: UserData
}> = ({ posts, userData }) => {
  return (
    <AbsoluteFill
      style={{
        fontSize: 30,
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Audio
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [posts.length * 3 + 299 - 240, posts.length * 3 + 299],
            [1, 0],
            { extrapolateLeft: "clamp" }
          )
        }
        placeholder={undefined}
      />
      <Series>
        <Series.Sequence durationInFrames={50} key="intro">
          <HelloFadeIn userData={userData} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50} key="postCount">
          <PostCount postCount={posts.length} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={50} key="takeALook">
          <TextFadeIn text="Wanna take a look at them?" />
        </Series.Sequence>
        <Series.Sequence durationInFrames={29} key="letsgoo">
          <TextHeading text="Let's go!" />
        </Series.Sequence>
        {posts.map((post: MemoryPost) => (
          <Series.Sequence durationInFrames={durationInFrames} key={post.id}>
            <div
              style={{
                position: "relative",
              }}
            >
              <Img
                placeholder=""
                style={{ borderRadius: "40px" }}
                key={post.id}
                alt="primary"
                src={post.primary.url}
              />
              <Img
                placeholder=""
                style={{
                  position: "absolute",
                  top: "80px",
                  left: "80px",
                  width: "450px",
                  borderRadius: "40px",
                  border: "6px solid black",
                }}
                key={post.id}
                alt="primary"
                src={post.secondary.url}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "32px",
                width: "100%",
                textAlign: "center",
                fontSize: "60px",
                fontWeight: "bold",
              }}
            >
              {post.memoryDay}
            </div>
          </Series.Sequence>
        ))}
        <Series.Sequence durationInFrames={120} key="outro">
          <TextHeading text="Get your own BeReal Recap on bereal-tools.com!" />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  )
}
