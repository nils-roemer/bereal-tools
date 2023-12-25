import React from "react"
import { Composition } from "remotion"
import { MyComposition } from "./Composition"
import Cookies from "universal-cookie"
import { getMemoryFeedWithToken, MemoryPost } from "../../../utils/apiUtils"

const cookies = new Cookies()
export const durationInFrames = 3

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Empty"
        component={MyComposition}
        defaultProps={{
          posts: [],
        }}
        calculateMetadata={async () => {
          const data = await getMemoryFeedWithToken(cookies.get("token"))
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
    </>
  )
}
