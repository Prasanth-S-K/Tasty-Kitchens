import {useEffect, useState} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

function Profile() {
  const [favRestaurantNumbers, setFavRestaurantNumbers] = useState(0)
  const [cartNumber, setCartNumber] = useState(0)
  const [orderNumbers, setOrderNumbers] = useState(0)

  useEffect(() => {
    const updateCounts = () => {
      try {
        const favs =
          JSON.parse(localStorage.getItem('favouriteRestaurants')) || []
        const cart = JSON.parse(localStorage.getItem('cartData')) || []
        const orders = JSON.parse(localStorage.getItem('orderDetails')) || []

        setFavRestaurantNumbers(favs.length)
        setCartNumber(cart.length)
        setOrderNumbers(orders.length)
      } catch {
        setFavRestaurantNumbers(0)
        setCartNumber(0)
        setOrderNumbers(0)
      }
    }

    updateCounts()
    window.addEventListener('storageUpdated', updateCounts)

    return () => {
      window.removeEventListener('storageUpdated', updateCounts)
    }
  }, [])

  return (
    <>
      <Header />
      <div className="profile-container">
        <img
          src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1758902923/Prasanth1_lnaezb.jpg"
          alt="profile"
          className="profile-image"
        />

        <h1 className="profile-name">Prasanth Kamalanathan</h1>

        <div className="profile-card">
          <h2>Delivery Address</h2>
          <p>
            Mada street,
            <br />
            Pallikonda,
            <br />
            Vellore,
            <br />
            Tamilnadu - 635809
          </p>
          <p className="profile-mobile">📞 6382071791</p>
        </div>

        {/* SUMMARY SECTION */}
        <div className="profile-summary">
          <div className="summary-item">
            <p className="summary-count">{orderNumbers}</p>
            <p className="summary-label">Orders</p>
          </div>
          <div className="summary-item">
            <p className="summary-count">{favRestaurantNumbers}</p>
            <p className="summary-label">Favorites</p>
          </div>
          <div className="summary-item">
            <p className="summary-count">{cartNumber}</p>
            <p className="summary-label">Cart Items</p>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/favourite-restaurants">
            <button className="profile-btn" type="button">
              Favorite Restaurants
            </button>
          </Link>

          <Link to="/cart">
            <button className="profile-btn" type="button">
              My Cart
            </button>
          </Link>

          <Link to="/orderdetails">
            <button className="profile-btn" type="button">
              Order Details
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
