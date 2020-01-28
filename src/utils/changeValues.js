export const changeCardNumber = (value) => {
  let newValue = value.replace(/\s/g, '')
  newValue = newValue.match(/.{1,4}/g)
  newValue = newValue.join(' ')
  return newValue
}

export const changeDate = (value) => {
  let newValue = value.replace(/\//g, '')
  newValue = newValue.match(/.{1,2}/g)
  newValue = newValue.join('/')
  return newValue
}