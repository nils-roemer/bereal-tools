import MainLayout from "../../../components/layout/MainLayout"

const SaveToCameraRoll = () => {
  return (
    <MainLayout>
      {" "}
      <div className="flex flex-col justify-center items-center mt-6 text-center mx-5">
        <div className="text-lg font-bold mb-5">
          How to save your video in the camera roll (iOS)
        </div>
        <div className="w-64">Download the video first.</div>
        <img src="/save-tutorial/tut_1.png" className="w-64 my-2" alt="tut-1" />
        <div className="w-64">Then, go to the downloads.</div>
        <img src="/save-tutorial/tut_2.png" className="w-64 my-2" alt="tut-2" />
        <div className="w-64">Tap the downloaded video in the downloads.</div>
        <img src="/save-tutorial/tut_3.png" className="w-64 my-2" alt="tut-3" />
        <div className="w-64">Tap the share button.</div>
        <img src="/save-tutorial/tut_4.png" className="w-64 my-2" alt="tut-4" />
        <div className="w-64">Tap on 'Save Video'.</div>
        <img src="/save-tutorial/tut_5.png" className="w-64 my-2" alt="tut-5" />
        <div className="w-64 mb-10">
          You successfully saved your video to the camera roll! 🎉
        </div>
      </div>
    </MainLayout>
  )
}

export default SaveToCameraRoll
