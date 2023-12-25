import { useState } from "react"
import AuthCode from "react-auth-code-input"
import { setCookie } from "../../../utils/authUtils"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import { MuiTelInput } from "mui-tel-input"
import { checkPhoneNumber } from "../../../utils/validationUtils"
import { getErrorMessageDiv } from "../../../components/utilComponents/ErrorMessage"
import { sendConfirmationCode, sendPhoneNumber } from "../../../utils/apiUtils"
import { useMutation } from "@tanstack/react-query"
import { CircularProgress } from "@mui/material"
import Footer from "../../../components/layout/Footer"

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [validPhone, setValidPhone] = useState(false)
  const [phoneNumberIsSent, setPhoneNumberIsSent] = useState(false)
  const [confirmationCodeIsSent, setConfirmationCodeIsSent] = useState(false)
  const [otpSession, setOtpSession] = useState("")
  const [confirmationActive, setConfirmationActive] = useState(false)
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("")
  const [codeErrorMessage, setCodeErrorMessage] = useState("")

  const navigate = useNavigate()

  const setPhoneNumberAndValidate = (phone: string) => {
    phone = phone.replace(/\s+/g, "")
    setPhoneNumber(phone)
    setValidPhone(checkPhoneNumber(phoneNumber))
    if (!validPhone) {
      setPhoneErrorMessage("Enter a valid phone number (e.g. +49 172 12345)")
    } else {
      setPhoneErrorMessage("")
    }
  }

  const sendPhoneMutation = useMutation({
    mutationFn: sendPhoneNumber,
    onMutate: () => setPhoneNumberIsSent(true),
    onSuccess: (res) => {
      setOtpSession(res.data.otpSession)
      setConfirmationActive(true)
      setPhoneErrorMessage("")
    },
    onError: () => {
      setPhoneErrorMessage("Failed sending code. Is is the right number?")
    },
    onSettled: () => setPhoneNumberIsSent(false),
  })

  const handleSendPhone = async () => {
    sendPhoneMutation.mutate(phoneNumber)
  }

  const sendConfirmationCodeMutation = useMutation({
    mutationFn: sendConfirmationCode,
    onMutate: () => setConfirmationCodeIsSent(true),
    onSuccess: (res) => {
      console.log("REES: " + res)
      setCookie(res.data.data.token)
      navigate("/")
    },
    onError: () => {
      setCodeErrorMessage("Wrong confirmation code. Try again!")
    },
    onSettled: () => setConfirmationCodeIsSent(false),
  })

  const handleConfirmationCodeChange = (code: string) => {
    setCodeErrorMessage("")
    if (code.length === 6) {
      sendConfirmationCodeMutation.mutate({ code, otpSession })
    }
  }

  const confirmationInput = (
    <div className="flex flex-col w-full fixed bottom-5 justify-center">
      <div className="w-full flex justify-center text-xl mb-3">
        Please enter your confirmation code
      </div>
      {codeErrorMessage && (
        <div className="w-full flex justify-center">
          <div className="flex max-w-80 grow pb-3">
            {getErrorMessageDiv(codeErrorMessage)}
          </div>
        </div>
      )}
      <AuthCode
        autoFocus
        inputClassName="w-10 text-5xl m-2 text-center"
        containerClassName="w-full flex justify-center text-black"
        allowedCharacters={"numeric"}
        disabled={confirmationCodeIsSent}
        onChange={handleConfirmationCodeChange}
      />
      <div className="mt-2">
        <Footer />
      </div>
    </div>
  )

  const phoneInput = (
    <div className="flex flex-col w-full fixed bottom-5 justify-center">
      {phoneErrorMessage && (
        <div className="w-full flex justify-center">
          <div className="flex max-w-80 grow pb-3">
            {getErrorMessageDiv(phoneErrorMessage)}
          </div>
        </div>
      )}
      <div className="w-full flex justify-center pb-5">
        <MuiTelInput
          className="flex max-w-80 grow bg-white rounded-md"
          defaultCountry="DE"
          value={phoneNumber}
          onChange={(phone) => setPhoneNumberAndValidate(phone)}
        />
      </div>
      <div className="w-full flex justify-center">
        <Button
          className="flex max-w-80 grow justify-center"
          size="large"
          variant="contained"
          disabled={!validPhone || phoneNumberIsSent}
          onClick={handleSendPhone}
        >
          {phoneNumberIsSent && (
            <CircularProgress size="1rem" className="mr-5" />
          )}
          <div className="text-xl">Send Code</div>
        </Button>
      </div>
      <div className="mt-2">
        <Footer />
      </div>
    </div>
  )

  return (
    <>
      <div className="flex justify-center mt-6">
        <img className="w-64" src="/logo-white.png" alt="logo" />
      </div>
      {confirmationActive ? confirmationInput : phoneInput}
    </>
  )
}

export default Login
