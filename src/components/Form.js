/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import * as validate from '../utils/validate';
import * as changeValues from '../utils/changeValues'

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
        errors.confirmPassword = value !== this.state.password ? 'Must match password field' : ''
      break;
      case 'cardNumber':
        errors.cardNumber = validate.validateCardNumber(value)
      break;
      case 'expiration':
        errors.expiration = validate.validateExpiration(value)
      break;
      case 'pin': 
        errors.pin = validate.validatePin(value)
      break;
      default:
        break;
    }

    if (name === 'cardNumber' && value.length > 1) {
      this.setState({
        errors,
        [name]: changeValues.changeCardNumber(value)
      })
    } else if (name === 'expiration' && value.length > 0) {
      this.setState({
        errors,
        [name]: changeValues.changeDate(value)
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
    if (this.validateForm(this.state.errors)) {
      this.props.history.push('/dashboard')
    } else {
      alert('Invalid Form')
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
    const {
      errors,
      name,
      email,
      number,
      password,
      confirmPassword,
      cardNumber,
      expiration,
      pin
    } = this.state;
    return (
        <div className='form-wrapper'>
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className='fullName'>
              <label htmlFor="fullName">Full Name</label>
              <input 
                type='text'
                name='fullName'
                placeholder="Name Surname"
                onChange={this.handleChange}
                value={name}
              />
              {errors.fullName.length > 0 && <span className='error'>{errors.fullName}</span>}
            </div>
            <div className='fullName'>
              <label htmlFor="email">Email</label>
              <input 
                type='email' 
                name='email'
                placeholder="email@example.com" 
                onChange={this.handleChange} 
                value={email}
              />
              {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
            </div>
            <div className='email'>
              <label htmlFor="number">Phone Number</label>
              <input 
                type='text' 
                name='number'
                placeholder = "070XXXXXXX"
                onChange={this.handleChange} 
                value={number}
                maxLength={11}
              />
              {errors.number.length > 0 && <span className='error'>{errors.number}</span>}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input 
                type='password' 
                name='password'
                placeholder = "••••••••••••"
                onChange={this.handleChange}
                value={password}
                />
              {errors.password.length > 0 && <span className='error'>{errors.password}</span>}
            </div>
            <div className='password'>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type='password' 
                name='confirmPassword'
                placeholder = "••••••••••••"
                onChange={this.handleChange} 
                value={confirmPassword}
                />
              {errors.confirmPassword.length > 0 && <span className='error'>{errors.confirmPassword}</span>}
            </div>
            <div className='password'>
              <label htmlFor="cardNumber">Credit/Debit Card Number</label>
              <input 
                type='text' 
                name='cardNumber'
                placeholder = "•••• •••• •••• ••••"
                onChange={this.handleChange} 
                value={cardNumber}
                maxLength={19}
              />
              {errors.cardNumber.length > 0 && <span className='error'>{errors.cardNumber}</span>}
            </div>
            <div className='password'>
              <label htmlFor="expiration">Card Expiration</label>
              <input 
                type='text' 
                name='expiration'
                placeholder="MM/YY"
                onChange={this.handleChange} 
                value={expiration}
                maxLength={5}
              />
              {errors.expiration.length > 0 && <span className='error'>{errors.expiration}</span>}
            </div>
            <div className='password'>
              <label htmlFor="pin">Pin</label>
              <input 
                type='password' 
                name='pin'
                placeholder='••••' 
                onChange={this.handleChange} 
                value={pin}
                maxLength={4}
                />
              {errors.pin.length > 0 && <span className='error'>{errors.pin}</span>}
            </div>
            <div className='submit'>
              <button disabled={!this.validateForm(this.state.errors)}>Submit</button>
            </div>
          </form>
        </div>
    );
  }
}

export default Form;
