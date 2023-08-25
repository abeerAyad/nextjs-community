import * as Yup from 'yup'

export const validateLogin = Yup.object({
  email: Yup.string().email('please provide a valid email').required('Please provide an email'),
  password: Yup.string().required('Please provide password').min(5, 'it must be more than 3 characters').required('Please provide password'),
 
})