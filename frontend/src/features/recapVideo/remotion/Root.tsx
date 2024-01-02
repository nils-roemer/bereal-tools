import React from "react"
import { Composition, getInputProps } from "remotion"
import { MyComposition } from "./Composition"
import { get2023Feed, getMeWithToken } from "../../../utils/apiUtils"
import "./style.css"
import { setUserNameCookie } from "../../../utils/cookieUtil"
export const durationInFrames = 3

export const RootWrapper: React.FC<{ token: string }> = ({ token }) => {
  return <RemotionRoot token={token} />
}

export const RemotionRoot: React.FC<{ token: string }> = ({ token }) => {
  return (
    <Composition
      id="BeRealRecap"
      component={MyComposition}
      defaultProps={{
        posts: [],
        userData: {
          fullname: "",
          profilePicture: { width: 0, height: 0, url: "" },
          username: "",
        },
      }}
      calculateMetadata={async () => {
        const { userToken } = getInputProps()
        let data
        let userData

        if (typeof userToken === "string") {
          //AWS lambda rendering
          userData = await getMeWithToken(userToken)
        } else {
          // Web studio rendering
          userData = await getMeWithToken(token)
        }

        setUserNameCookie(userData.username.replaceAll(".", "-"))

        if (typeof userToken === "string") {
          //AWS lambda rendering
          data = await get2023Feed(userToken)
        } else {
          // Web studio rendering
          data = await get2023Feed(token)
        }

        return {
          props: {
            posts: data.reverse(),
            userData: userData,
          },
          durationInFrames: data.length * durationInFrames + 299,
        }
      }}
      durationInFrames={60}
      fps={30}
      width={1500}
      height={2150}
    />
  )
}
