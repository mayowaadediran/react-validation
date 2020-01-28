import React, { Component } from 'react';
import * as validate from '../utils/validate';
import * as changeValues from '../utils/changeValues';
import { withRouter } from 'react-router-dom';
import Error from './Error';
import Button from './Button'
import Tooltip from './Tooltip';

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
    if (this.validateForm(this.state.errors) && this.validateFields()) {
      this.props.history.push('/dashboard')
    } 
    else {
      alert('Invalid Form')
    }
  }

  validateFields = () => {
    let {errors, ...rest} = this.state
    let valid = true
    let values = Object.values(rest)
    values.forEach(function (val) {
      val.length === 0 && (valid = false)
    })
     return valid
  }

  validateForm = (errors) => {
    let errorValid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (errorValid = false)
    );
    
    return errorValid;
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
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor="fullName">Full Name</label>
            <input 
              type='text'
              name='fullName'
              placeholder="Name Surname"
              onChange={this.handleChange}
              value={name}
            />
            <Tooltip 
              tip={'Name must not be less that 2 characters, must include a space and then second name'}
            />
            {errors.fullName.length > 0 && <Error error={errors.fullName}/>}
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input 
              type='email' 
              name='email'
              placeholder="email@example.com" 
              onChange={this.handleChange} 
              value={email}
            />
            <Tooltip 
              tip={'Must include a valid email address'}
            />
            {errors.email.length > 0 && <Error error={errors.email}/>}
          </div>
          <div className='form-group'>
            <label htmlFor="number">Phone Number</label>
            <input 
              type='text' 
              name='number'
              placeholder = "070XXXXXXX"
              onChange={this.handleChange} 
              value={number}
              maxLength={11}
            />
            <Tooltip 
              tip={'Must be a Nigerian Phone number (without +234, e.g. starts with 070..., 080..., 090..., 081, etc, must not be longer or shorter than 11 characters'}
            />
            {errors.number.length > 0 && <Error error={errors.number}/>}
          </div>
          <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input 
              type='password' 
              name='password'
              placeholder = "••••••••••••"
              onChange={this.handleChange}
              value={password}
              />
              <Tooltip 
               tip={'Must contain at least one uppercase character, one number, special character and not shorter than 6 characters'}
              />
            {errors.password.length > 0 && <Error error={errors.password}/>}
          </div>
          <div className='form-group'>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type='password' 
              name='confirmPassword'
              placeholder = "••••••••••••"
              onChange={this.handleChange} 
              value={confirmPassword}
              />
             <Tooltip 
              tip={'Must match password field'}
            />
            {errors.confirmPassword.length > 0 &&<Error error={errors.confirmPassword}/>}
          </div>
          <div className='form-group'>
            <label htmlFor="cardNumber">Credit/Debit Card Number</label>
            <input 
              type='text' 
              name='cardNumber'
              placeholder = "•••• •••• •••• ••••"
              onChange={this.handleChange} 
              value={cardNumber}
              maxLength={19}
            />
            <Tooltip 
              tip={'must match the ‘XXXX XXXX XXXX XXXX’ format, accepts only numbers'}
            />
            {errors.cardNumber.length > 0 && <Error error={errors.cardNumber}/>}
          </div>
          <div className='card-security'>
            <div className='form-group'>
              <label htmlFor="expiration">Card Expiration</label>
              <input 
                type='text' 
                name='expiration'
                placeholder="MM/YY"
                onChange={this.handleChange} 
                value={expiration}
                maxLength={5}
              />
              <Tooltip 
                tip={'Must match MM/YY format, only dates later that 01/20'}
              />
              {errors.expiration.length > 0 && <Error error={errors.expiration}/>}
            </div>
            <div className='form-group'>
              <label htmlFor="pin">Pin</label>
              <input 
                type='password' 
                name='pin'
                placeholder='••••' 
                onChange={this.handleChange} 
                value={pin}
                maxLength={4}
                />
                <Tooltip 
                  tip={'Should be 4 characters long, only accept numbers'}
                />
              {errors.pin.length > 0 && <Error error={errors.pin}/>}
            </div>
          </div>
          <Button 
            text="Submit"
            disabled={!(this.validateForm(this.state.errors) && this.validateFields())}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Form);
