/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import * as validate from '../utils/validate';
import * as formatValues from '../utils/formatValues'


class Form extends Component {

    state = {
      fullName: '',
      email: '',
      number: '',
      password: '',
      confirmPassword: '', 
      cardNumber: '', 
      expiration: '',
      pin: '',
      errors: {
        fullName: '',
        email: '',
        number: '',
        password: '',
        confirmPassword: '',
        cardNumber: '',
        expiration: '', 
        pin: ''
      }
  };

  
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullName':
        errors.fullName = validate.validateName(value);
        break;
      case 'email': 
        errors.email = validate.validateEmail(value)
        break;
      case 'number':
        errors.number = validate.validateNumber(value)
        break;
      case 'password':
        errors.password = validate.validatePassword(value)
        break;
      case 'confirmPassword':
        errors.confirmPassword = 
        value !== this.state.password 
        ? 'Must match password field'
        : ''
      break;
      case 'cardNumber':
        errors.cardNumber = validate.validateCardNumber(value)
      break;
      case 'expiration':
        errors.expiration = validate.validateExpiration(value)
      break;
      default:
        break;
    }

    if (name === 'cardNumber' && value.length > 1) {
      let newValue = formatValues.formatCardNumber(value)
      this.setState({
        errors,
        [name]: newValue
      })
    } else if (name === 'expiration' && value.length > 0) {
      let newValue = formatValues.formatDate(value)
      this.setState({
        errors,
        [name]: newValue
      })
    } else {
      this.setState({
        errors,
        [name]: value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.validateForm(this.state.errors)) {
      console.info('Valid Form')
    }else{
      console.error('Invalid Form')
    }
  }

  validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  render() {
    const {errors} = this.state;
    return (
      <div className='wrapper'>
        <div className='form-wrapper'>
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName">
                Full Name
              </label>
              <input 
                type='text'
                name='fullName'
                placeholder=""
                onChange={this.handleChange}
                value={this.state.name}
              />
              {errors.fullName.length > 0 && <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='email'>
              <label htmlFor="email">
                Email
              </label>
              <input 
                type='email' 
                name='email'
                placeholder="email@example.com" 
                onChange={this.handleChange} 
                value={this.state.email}
              />
              {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
            </div>
            <div className='email'>
              <label htmlFor="number">
                Phone Number
              </label>
              <input 
                type='text' 
                name='number'
                placeholder = "email@example.com"
                onChange={this.handleChange} 
                value={this.state.number}
                maxLength={11}
              />
              {errors.number.length > 0 && <span className='error'>{errors.number}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">
                Password
              </label>
              <input 
                type='password' 
                name='password'
                placeholder = "email@example.com"
                onChange={this.handleChange}
                value={this.state.password}
                />
              {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>}
            </div>
            <div className='password'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type='password' 
                name='confirmPassword' 
                onChange={this.handleChange} 
                value={this.state.confirmPassword}
                />
              {errors.confirmPassword.length > 0 && <span className='error'>{errors.confirmPassword}</span>}
            </div>
            <div className='password'>
              <label htmlFor="cardNumber">Credit/Debit Card Number</label>
              <input type='text' 
                name='cardNumber' 
                onChange={this.handleChange} 
                value={this.state.cardNumber}
                maxLength={19}
              />
              {errors.cardNumber.length > 0 && 
                <span className='error'>{errors.cardNumber}</span>}
            </div>
            <div className='password'>
              <label htmlFor="expiration">Card Expiration</label>
              <input type='text' 
                name='expiration' 
                onChange={this.handleChange} 
                value={this.state.expiration}
                maxLength={5}
              />
              {errors.expiration.length > 0 && 
                <span className='error'>{errors.expiration}</span>}
            </div>
            <div className='password'>
              <label htmlFor="pin">Pin</label>
              <input 
                type='password' 
                name='pin' 
                onChange={this.handleChange} 
                value={this.state.pin}
                maxLength={4}
                />
              {errors.pin.length > 0 && <span className='error'>{errors.pin}</span>}
            </div>
            <div className='submit'>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
