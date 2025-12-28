// import './index.css'
// import {Link, withRouter, NavLink} from 'react-router-dom'
// import Cookies from 'js-cookie'

// const Header = props => {
//   const {history} = props

//   const Logout = () => {
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }

//   return (
//     <div className="header-container">
//       <Link exact to="/" className="header-logo-container">
//         <img
//           src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1762585432/Frame_274_tzosjv.svg"
//           alt="website logo"
//           className="header-logo"
//         />
//         <h1 className="website-header-name">Tasty Kitchens</h1>
//       </Link>

//       <div className="links-container">
//         <NavLink exact to="/" activeClassName="active-link">
//           Home
//         </NavLink>

//         <NavLink exact to="/cart" activeClassName="active-link">
//           Cart
//         </NavLink>

//         <NavLink exact to="/profile">
//           <img
//             src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1758902923/Prasanth1_lnaezb.jpg"
//             className="profile-nav"
//             alt="profile-picture"
//           />
//         </NavLink>

//         <button type="button" onClick={Logout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   )
// }

// export default withRouter(Header)
// ===========================================================================================================

import './index.css'
import {Link, withRouter, NavLink} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'

const Header = props => {
  const {history} = props
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const Logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      {/* Logo */}
      <Link exact to="/" className="header-logo-container">
        <img
          src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1762585432/Frame_274_tzosjv.svg"
          alt="website logo"
          className="header-logo"
        />
        <h1 className="website-header-name">Tasty Kitchens</h1>
      </Link>

      {/* Desktop Menu */}
      <div className="links-container desktop-menu">
        <NavLink exact to="/" activeClassName="active-link">
          Home
        </NavLink>

        <NavLink exact to="/cart" activeClassName="active-link">
          Cart
        </NavLink>

        <NavLink exact to="/profile">
          <img
            src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1758902923/Prasanth1_lnaezb.jpg"
            className="profile-nav"
            alt="profile"
          />
        </NavLink>

        <button type="button" onClick={Logout}>
          Logout
        </button>
      </div>

      {/* Hamburger Icon */}
      <button
        type="button"
        className="hamburger-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <NavLink exact to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink exact to="/cart" onClick={() => setIsMenuOpen(false)}>
            Cart
          </NavLink>

          <NavLink exact to="/profile" onClick={() => setIsMenuOpen(false)}>
            Profile
          </NavLink>

          <button type="button" onClick={Logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default withRouter(Header)
