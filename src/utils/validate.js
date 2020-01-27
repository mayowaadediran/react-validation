/* eslint-disable no-useless-escape */

const checkNameSpace = /[\-\w]+\s[\-\w]+/
const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const checkNumberRegex = /^\d+$/
const checkPhoneRegex = /^(070|080|090|081)[0-9]{8}$/
const checkUpperCaseRegex = /^(?=.*?[A-Z])/
  // const checkNumberRegex = RegExp(/^(?=.*?[0-9])/)
const checkSpecialChar = /^(?=.*?[!@#$%^&*])/
const checkPinRegex = /^(0[1-9]|1[0-2])([2-9]\d)$/


export const validateName = (value) => {
  let error = ''
  value.length < 2 
  ? error.fullName = 'Name must not be less that 2 characters!' 
  : !checkNameSpace.test(value) 
  ? error.fullName = 'Full Name must include a space and then second name' 
  : error.fullName = ''
  return error
}


export const validateEmail = (value) => {
  let error = ''
  if (!validEmailRegex.test(value)) {
    error = 'Email Not Valid'
  }
  return error
}

export const validateNumber = (value) => {
  let error = ''
  if (!checkNumberRegex.test(value)) {
    error = 'Must contain only Numbers'
  } else if (value.length < 11 || value.length > 11) {
    error = 'Must be a 11 digit Number'
  } else if (!checkPhoneRegex.test(value)) {
    error = 'Must be a valid Nigerian number'
  }
  return error
}

export const validatePassword = (value) => {
  let error = ''
  if (value.length < 6) {
    error = 'Must not be shorter the 6 character'
  } else if (!checkUpperCaseRegex.test(value)) {
    error = 'Must contain at least one uppercase character'
  } else if (!checkNumberRegex.test(value)) {
    error = 'Must contain at least one number'
  } else if (!checkSpecialChar.test(value)) {
    error = 'Must contain at least one special character'
  }
  return error
}

export const validateCardNumber = (value) => {
  let error = ''
  let newValue = value.replace(/\s/g,'')
  if (!checkNumberRegex.test(newValue)) {
    error = 'Must contain only numbers'
  }
  return error
}

export const validateExpiration = (value) => {
  let error = ''
  let newValue = value.replace(/\//,'')
  if (!checkPinRegex.test(newValue)) {
    error = 'Must be MM/YY format'
  }
  return error
}