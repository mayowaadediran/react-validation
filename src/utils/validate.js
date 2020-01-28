/* eslint-disable no-useless-escape */

const checkNameSpace = /[\-\w]+\s[\-\w]+/
const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const checkNumberRegex = /^\d+$/
const checkPasswordNumberRegex = /^(?=.*?[0-9])/
const checkPhoneRegex = /^(070|080|090|081)[0-9]{8}$/
const checkUpperCaseRegex = /^(?=.*?[A-Z])/
const checkSpecialChar = /^(?=.*?[!@#$%^&*])/
const checkExpirationRegex = /^(0[1-9]|1[0-2])([2-9]\d)$/

let error = ''

export const validateName = (value) => {
  if(value.length < 2) {
    error = 'Name must not be less that 2 characters!'
  } else if (!checkNameSpace.test(value)) {
    error = 'Name must include a space and then second name'
  } else {
    error = ''
  }
  return error
}

export const validateEmail = (value) => {
  !validEmailRegex.test(value) ? error = 'Email must be valid' : error = ''
  return error
}

export const validateNumber = (value) => {
  if (!checkNumberRegex.test(value)) {
    error = 'Must contain only Numbers'
  } else if (value.length < 11 || value.length > 11) {
    error = 'Must be a 11 digit Number'
  } else if (!checkPhoneRegex.test(value)) {
    error = 'Must be a valid Nigerian number'
  } else {
    error = ''
  }
  return error
}

export const validatePassword = (value) => {
  if (value.length < 6) {
    error = 'Must not be shorter the 6 character'
  } else if (!checkUpperCaseRegex.test(value)) {
    error = 'Must contain at least one uppercase character'
  } else if (!checkPasswordNumberRegex.test(value)) {
    error = 'Must contain at least one number'
  } else if (!checkSpecialChar.test(value)) {
    error = 'Must contain at least one special character'
  } else { 
    error = ''
  }
  return error
}

export const validateCardNumber = (value) => {
  let newValue = value.replace(/\s/g, '')
  if (value.length < 19) {
    error= 'Must be 16 digits'
  } else if (!checkNumberRegex.test(newValue)) {
    error = 'Must contain only numbers'
  } else {
    error = ''
  }
  return error
}

export const validateExpiration = (value) => {
  let newValue = value.replace(/\//,'')
  !checkExpirationRegex.test(newValue) ? error = 'Must be MM/YY format' : error = ''
  return error
}

export const validatePin = (value) => {
  if (value.length < 4) {
    error = 'Must be 4 number'
  } else if (!checkNumberRegex.test(value)) {
    error = 'Must contain only numbers'
   } else {
    error = ''
   } 
  return error
}