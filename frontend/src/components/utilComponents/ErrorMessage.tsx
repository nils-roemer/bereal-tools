export const getErrorMessageDiv = (errorMessage: string) => {
  return (
    <div className="text-red-600 text-sm w-full text-center">
      {errorMessage}
    </div>
  )
}
