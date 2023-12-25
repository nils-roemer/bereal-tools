export const checkPhoneNumber = (phoneNumber: string) => {
  const regex = /^\+\d{7,14}$/
  return regex.test(phoneNumber)
}
