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
      <div style={{ transform: `scale(${scale})`, fontSize: "120px" }}>
        <div>Hello {userData.fullname}!</div>
        <Img
          placeholder=""
          style={{
            borderRadius: "250px",
            width: "500px",
            borderColor: "white",
            marginTop: "80px",
          }}
          key={userData.profilePicture.url}
          alt="primary"
          src={userData.profilePicture.url}
        />
      </div>
    </AbsoluteFill>
  )
}

export default HelloFadeIn
