import MainLayout from "../../../components/layout/MainLayout"
import Button from "@mui/material/Button"
import { getRenderProgress, renderMediaOnLambda } from "@remotion/lambda/client"
import { getCookie } from "../../../utils/authUtils"
import { useState } from "react"
import CircularProgressWithLabel from "../components/CircularProgressWithLabel"
import ReactPlayer from "react-player"
import { getVideoUrl, setVideoUrlCookie } from "../../../utils/cookieUtil"
import { ArrowCircleDown } from "@mui/icons-material"

const RecapVideo = () => {
  const [isRendering, setIsRendering] = useState(false)
  const [renderingProgress, setRenderingProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState(getVideoUrl)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = videoUrl
    link.download = "download"

    // Append to the DOM
    document.body.appendChild(link)

    // Programmatically click the link to trigger the download
    link.click()

    // Remove the element from the DOM
    document.body.removeChild(link)
  }

  const renderVideo = async () => {
    const functionName = "remotion-render-4-0-82-mem2048mb-disk2048mb-120sec"
    const region = "us-east-1"

    setRenderingProgress(0)
    setVideoUrl("")

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: region,
      functionName: functionName,
      serveUrl:
        "https://remotionlambda-useast1-7i972a7u8e.s3.us-east-1.amazonaws.com/sites/bereal-recap-video/index.html",
      composition: "BeRealRecap",
      inputProps: {
        userToken: getCookie(),
      },
      codec: "h264",
      imageFormat: "jpeg",
      maxRetries: 1,
      framesPerLambda: 20,
      privacy: "public",
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
          {!videoUrl && (
            <div className="mt-5">
              <Button variant="contained" endIcon={<ArrowCircleDown />}>
                <div className="text-md" onClick={handleDownload}>
                  Download Video
                </div>
              </Button>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  )
}

export default RecapVideo
