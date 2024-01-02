import MainLayout from "../../../components/layout/MainLayout"
import Button from "@mui/material/Button"
import { getRenderProgress, renderMediaOnLambda } from "@remotion/lambda/client"
import { getCookie } from "../../../utils/authUtils"
import React, { useState } from "react"
import CircularProgressWithLabel from "../components/CircularProgressWithLabel"
import ReactPlayer from "react-player"
import {
  getUserNameCookie,
  getVideoUrl,
  setUserNameCookie,
  setVideoUrlCookie,
} from "../../../utils/cookieUtil"
import { ArrowCircleDown } from "@mui/icons-material"
import axios from "axios"
import { CircularProgress } from "@mui/material"
import { getMeWithToken } from "../../../utils/apiUtils"

const RecapVideo = () => {
  const [isRendering, setIsRendering] = useState(false)
  const [renderingProgress, setRenderingProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState(getVideoUrl)
  const [videoIsInDownload, setVideoIsInDownload] = useState(false)

  const downloadBlob = async () => {
    setVideoIsInDownload(true)
    try {
      const response = await axios.get(videoUrl, { responseType: "blob" })
      const blob = response.data

      // Create a link element, use it to download the blob, and then remove it
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.setAttribute("download", `BeRealRecap.mp4`) // Set the file name for download

      // Append link to the body, click it, and then remove it
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
    } catch (error) {
      console.error("Error downloading blob:", error)
    } finally {
      setVideoIsInDownload(false)
    }
  }

  const renderVideo = async () => {
    const functionName = "remotion-render-4-0-82-mem2048mb-disk2048mb-120sec"
    const region = "eu-central-1"

    setRenderingProgress(0)
    setVideoUrl("")

    await getMeWithToken(getCookie()).then((userData) => {
      setUserNameCookie(userData.username.replace(".", "-"))
    })

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: region,
      functionName: functionName,
      serveUrl:
        "https://remotionlambda-eucentral1-9wni9xurg1.s3.eu-central-1.amazonaws.com/sites/bereal-recap-video/index.html",
      composition: "BeRealRecap",
      inputProps: {
        userToken: getCookie(),
      },
      codec: "h264",
      imageFormat: "jpeg",
      maxRetries: 1,
      framesPerLambda: 20,
      privacy: "public",
      crf: 30,
      outName: "_recap-" + getUserNameCookie() + ".mp4",
    })

    setIsRendering(true)

    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName,
        region: region,
      })
      setRenderingProgress(progress.overallProgress * 100)
      if (progress.done) {
        setVideoUrl(progress.outputFile || "")
        setVideoUrlCookie(progress.outputFile || "")
        setIsRendering(false)
        break
      }
      if (progress.fatalErrorEncountered) {
        setIsRendering(false)
        break
      }
    }
  }

  return (
    <MainLayout>
      {!isRendering && !videoUrl && (
        <div className="flex flex-col justify-center items-center h-[630px]">
          <div className="mb-10 font-bold text-2xl">Your BeReal Recap</div>
          <Button
            variant="contained"
            size="medium"
            onClick={async () => {
              setIsRendering(true)
              await renderVideo()
            }}
          >
            <div className="font-bold text-md">Create</div>
          </Button>
        </div>
      )}
      {isRendering && !videoUrl && (
        <div className="flex flex-col justify-center items-center h-[630px]">
          <div className="mb-10 font-bold text-2xl">
            Creating your BeReal Recap
          </div>
          <CircularProgressWithLabel value={renderingProgress} />
        </div>
      )}
      {videoUrl && (
        <div className="flex flex-col justify-center items-center h-[630px]">
          <div className="mb-5 font-bold text-2xl">Your BeReal Recap</div>
          <ReactPlayer url={videoUrl} width="350px" playing loop controls />
          <div className="mt-5 flex flex-col justify-center items-center">
            <Button
              variant="contained"
              endIcon={!videoIsInDownload && <ArrowCircleDown />}
              disabled={videoIsInDownload}
              onClick={() => downloadBlob()}
            >
              {videoIsInDownload ? (
                <div className="flex">
                  <div>Downloading Video</div>
                  <CircularProgress size="1rem" className="mt-1 ml-2" />
                </div>
              ) : (
                <div> Download Video</div>
              )}
            </Button>
            <button
              className="mt-6 text-sm text-blue-300 dark:text-blue-500 hover:underline"
              onClick={() =>
                window.open(
                  "/save-to-camera-roll",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              How to save the video to my camera roll (iOS)?
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  )
}

export default RecapVideo
