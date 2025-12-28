import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
    showPassword: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  toggleShowPassword = () =>
    this.setState(prevState => ({showPassword: !prevState.showPassword}))

  render() {
    const {username, password, showError, errorMsg, showPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        {/* Right Section  - Image */}
        <div className="login-right-section">
          <img
            src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1762585448/Rectangle_1456_pxcbzz.jpg"
            alt="login visual"
            className="login-image"
          />
        </div>

        {/* Left Section - Form */}
        <div className="login-left-section">
          <div className="login-card">
            <img
              src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1762585432/Frame_274_tzosjv.svg"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-name">Tasty Kitchens</h1>
            <h1 className="login-heading">Login</h1>
            <form onSubmit={this.onSubmitForm} className="form-container">
              <label htmlFor="username">USERNAME</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
              />

              <label htmlFor="password">PASSWORD</label>
              <div className="password-field">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={this.onChangePassword}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="eye-icon-btn"
                  onClick={this.toggleShowPassword}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="eye-icon" />
                  ) : (
                    <AiFillEye className="eye-icon" />
                  )}
                </button>
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
              {showError && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
