import React from "react"
import { Composition, getInputProps } from "remotion"
import { MyComposition } from "./Composition"
import { getMemoryFeedWithToken, MemoryPost } from "../../../utils/apiUtils"
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
      }}
      calculateMetadata={async () => {
        const { userToken } = getInputProps()
        let data

        if (typeof userToken === "string") {
          //AWS lambda rendering
          data = await getMemoryFeedWithToken(userToken)
        } else {
          // Web studio rendering
          data = await getMemoryFeedWithToken(token)
        }
        const thisYearsPosts = data.filter(async (post: MemoryPost) => {
          const date = new Date(post.memoryDay)
          return date.getFullYear() === 2023
        })
        const dataCleaned = thisYearsPosts.reverse()

        return {
          props: {
            posts: dataCleaned,
          },
          durationInFrames: data.length * durationInFrames,
        }
      }}
      durationInFrames={60}
      fps={30}
      width={1500}
      height={2000}
    />
  )
}
