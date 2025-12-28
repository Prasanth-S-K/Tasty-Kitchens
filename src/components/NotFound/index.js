import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="notfound-container">
    <img
      src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1763460139/erroring_1_cwtbnp.jpg"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p className="not-found-para">
      We are sorry, the page you requested could not be found.
    </p>
    <p className="not-found-para">Please go back to homepage</p>

    <Link to="/" className="home-button">
      Home Page
    </Link>
  </div>
)

export default NotFound
