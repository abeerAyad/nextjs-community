import * as Yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
export const validateSignUp = Yup.object({
  username: Yup.string().required('Please provide username').min(3, 'it must be more than 3 characters').max(15, 'username is larger than the required of 15 characters'),
  email: Yup.string().email('please provide a valid email').required('Please provide an email'),
  password: Yup.string().required('Please provide password').min(5, 'it must be more than 3 characters').matches(passwordRules, { message: 'please create stronger password' }).required('Please provide password'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'passwords must match').required('please confirm your password'),
  image: Yup.string(),
})