import {
  AbsoluteFill,
  Img,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"
import React from "react"
import { UserData } from "../../../utils/apiUtils"

export const HelloFadeIn: React.FC<{
  userData: UserData
}> = ({ userData }) => {
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
      <div
        style={{
          transform: `scale(${scale})`,
          fontSize: "120px",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Hello {userData.fullname}!
        </div>
      </div>
      <div
        style={{
          transform: `scale(${scale})`,
          fontSize: "120px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          placeholder=""
          style={{
            borderRadius: "250px",
            width: "500px",
            borderColor: "white",
            marginTop: "80px",
          }}
          key={
            userData.profilePicture.url
              ? userData.profilePicture.url
              : "missing"
          }
          alt="primary"
          src={
            userData.profilePicture.url
              ? userData.profilePicture.url
              : "missing-profile-pic.png"
          }
        />
      </div>
    </AbsoluteFill>
  )
}

export default HelloFadeIn
