import {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Cart = () => {
  const [cartData, setCartData] = useState([])
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const stored = localStorage.getItem('cartData')
    if (stored) {
      setCartData(JSON.parse(stored))
    }
  }, [])

  const clearCart = () => {
    setCartData([])
    localStorage.removeItem('cartData')
    window.dispatchEvent(new Event('storageUpdated'))
  }

  const onIncrement = id => {
    const updated = cartData.map(item =>
      item.id === id ? {...item, quantity: item.quantity + 1} : item,
    )
    setCartData(updated)
    localStorage.setItem('cartData', JSON.stringify(updated))
    window.dispatchEvent(new Event('storageUpdated'))
  }

  const onDecrement = id => {
    const updated = cartData
      .map(item =>
        item.id === id ? {...item, quantity: item.quantity - 1} : item,
      )
      .filter(item => item.quantity > 0)

    setCartData(updated)
    localStorage.setItem('cartData', JSON.stringify(updated))
    window.dispatchEvent(new Event('storageUpdated'))
  }

  const placeOrder = () => {
    const total = cartData.reduce(
      (acc, item) => acc + item.cost * item.quantity,
      0,
    )

    const order = {
      id: Date.now(),
      items: cartData,
      total,
      orderedAt: new Date().toLocaleString(),
    }

    const existingOrders =
      JSON.parse(localStorage.getItem('orderDetails')) || []

    localStorage.setItem(
      'orderDetails',
      JSON.stringify([...existingOrders, order]),
    )
    window.dispatchEvent(new Event('storageUpdated'))

    // success popup
    setShowSuccessPopup(true)

    // Redirect
    setTimeout(() => {
      localStorage.removeItem('cartData')
      setCartData([])
      setShowSuccessPopup(false)
      history.replace('/orderdetails')
    }, 5000)
  }

  const totalPrice = cartData.reduce(
    (acc, each) => acc + each.quantity * each.cost,
    0,
  )

  if (cartData.length === 0) {
    return (
      <>
        <Header />
        <div className="empty-cart">
          <img
            alt="empty cart"
            src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1765647780/cooking_1_jwgu1w.png"
            className="empty-cart-image"
          />
          <h1>No Orders Yet!</h1>
          <p>Your cart is empty. Add something from the menu.</p>
          <Link to="/">
            <button type="button" className="order-button">
              Order now
            </button>
          </Link>
          <Link to="/orderdetails">
            <button type="button" className="order-button">
              Go to order page
            </button>
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      {/* ================= PAYMENT SUCCESS POPUP ================= */}
      <Popup
        open={showSuccessPopup}
        modal
        closeOnDocumentClick={false}
        contentStyle={{
          background: '#2c3e50',
          color: 'white',
          padding: '30px',
          borderRadius: '12px',
          textAlign: 'center',
          border: 'none',
        }}
      >
        <div className="payment-popup">
          <img
            src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1765717605/check-circle.1_1_zawqru.png"
            alt="success"
            className="ok-image"
          />
          <h2>Payment Successful</h2>
          <p>Your order has been placed successfully.</p>
          <p>Redirecting to order details...</p>
        </div>
      </Popup>

      <div className="cart-container">
        <h2>My Cart</h2>

        <div className="cart-header">
          <p className="column-name">Item</p>
          <p className="column-name">Quantity</p>
          <p className="column-name">Price</p>
        </div>

        <ul className="cart-list">
          {cartData.map(each => (
            <li key={each.id} className="cart-row">
              <div className="cart-item-info">
                <img src={each.imageUrl} alt={each.name} />
                <p>{each.name}</p>
              </div>

              <div className="cart-quantity">
                <button
                  type="button"
                  onClick={() => onDecrement(each.id)}
                  className="quantity-button"
                >
                  -
                </button>
                <span>{each.quantity}</span>
                <button
                  type="button"
                  onClick={() => onIncrement(each.id)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>

              <p className="cart-price">₹{each.cost * each.quantity}</p>
            </li>
          ))}
        </ul>

        <hr className="cart-divider" />

        <div className="cart-summary">
          <h3>
            Order Total: <span>₹{totalPrice}</span>
          </h3>
          <button type="button" className="order-button" onClick={placeOrder}>
            Place Order
          </button>
          <button type="button" className="clear-button" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Cart
