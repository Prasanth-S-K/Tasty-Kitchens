import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

class OrderDetails extends Component {
  state = {orders: []}

  componentDidMount() {
    const stored = JSON.parse(localStorage.getItem('orderDetails')) || []
    this.setState({orders: stored})
  }

  render() {
    const {orders} = this.state

    if (orders.length === 0) {
      return (
        <>
          <Header />
          <div className="no-orders">
            <img
              src="https://res.cloudinary.com/dtfndvjsg/image/upload/v1765728413/WhatsApp_Image_2025-12-14_at_20.59.58_13620a18_n50a3x.jpg"
              alt="no-orders"
            />
            <p>No Orders To Show.</p>
            <Link to="/">
              <button type="button" className="order-button">
                Order Now
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
        <div className="order-details-container">
          <h2>Your Orders</h2>

          <ul className="order-list">
            {orders.map(order => (
              <li key={order.id} className="order-card">
                <p>Total: ₹{order.total}</p>
                <p>Time: {order.orderedAt}</p>

                <Popup
                  modal
                  trigger={
                    <button type="button" className="view-btn">
                      View Details
                    </button>
                  }
                >
                  <div className="popup-container">
                    <h2 className="popup-title">Order Details</h2>
                    <hr className="popup-divider" />
                    <div className="popup-header">
                      <p className="popup-header-column">Item</p>
                      <p className="popup-header-column">Quantity</p>
                      <p className="popup-header-column">Price</p>
                    </div>

                    {order.items.map(item => (
                      <div key={item.id} className="popup-row">
                        <div className="popup-item bill-row">
                          <img src={item.imageUrl} alt={item.name} />
                          <span className="popup-item-name">{item.name}</span>
                        </div>

                        <p className="bill-row">{item.quantity}</p>
                        <p className="bill-row">₹{item.quantity * item.cost}</p>
                      </div>
                    ))}

                    <hr className="popup-divider" />

                    <div className="popup-footer">
                      <p>
                        <strong>Total:</strong> ₹{order.total}
                      </p>
                      <p className="popup-time">
                        <strong>Ordered at:</strong> {order.orderedAt}
                      </p>
                    </div>
                  </div>
                </Popup>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }
}

export default OrderDetails
