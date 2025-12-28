import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    details: null,
    isLoading: true,
    quantities: {},
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(
      `https://apis.ccbp.in/restaurants-list/${id}`,
      options,
    )

    if (response.ok) {
      const data = await response.json()
      this.setState({details: data, isLoading: false})
    }
  }

  incrementCount = food => {
    this.setState(prev => ({
      quantities: {
        ...prev.quantities,
        [food.id]: (prev.quantities[food.id] || 0) + 1,
      },
    }))
  }

  decrementCount = food => {
    this.setState(prev => ({
      quantities: {
        ...prev.quantities,
        [food.id]: Math.max((prev.quantities[food.id] || 0) - 1, 0),
      },
    }))
  }

  addToCart = () => {
    const {details, quantities} = this.state
    const existing = JSON.parse(localStorage.getItem('cartData')) || []

    details.food_items.forEach(food => {
      const quantity = quantities[food.id]
      if (quantity > 0) {
        const found = existing.find(item => item.id === food.id)
        if (found) {
          found.quantity += quantity
        } else {
          existing.push({
            id: food.id,
            name: food.name,
            cost: food.cost,
            imageUrl: food.image_url,
            quantity,
          })
        }
      }
    })

    localStorage.setItem('cartData', JSON.stringify(existing))
  }

  render() {
    const {details, isLoading, quantities} = this.state

    if (isLoading) {
      return (
        <div
          data-testid="restaurant-details-loader"
          className="restaurant-loader"
        >
          <Loader type="TailSpin" color="#F7931E" height={40} width={40} />
        </div>
      )
    }

    return (
      <>
        <Header />

        {/* ========================================================= HERO SECTION ==================================================== */}
        <div className="hero-container">
          <img
            src={details.image_url}
            alt="restaurant"
            className="restaurant-hero"
          />
          <div className="hero-text-container">
            <h1 className="hero-text-container-main-header">{details.name}</h1>
            <h2 className="hero-text-container-header">{details.cuisine}</h2>
            <p className="hero-text-container-para">{details.location}</p>
            <div className="rating-and-price-container">
              <div>
                <h1 className="rating-price-header">
                  <FaStar /> {details.rating}
                </h1>
                <p className="rating-price-para">
                  {details.reviews_count}+ Ratings
                </p>
              </div>
              <div className="divider" />
              <div>
                <h1 className="rating-price-header">
                  <FaRupeeSign /> {details.cost_for_two}
                </h1>
                <p className="rating-price-para ">cost for two</p>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================================FOOD ITEMS======================================================= */}
        <ul className="food-items-flex">
          {details.food_items.map(food => (
            <li key={food.id} data-testid="foodItem" className="food-card">
              <div className="food-card-image-wrapper">
                <img
                  src={food.image_url}
                  alt={food.name}
                  className="food-card-image"
                />
              </div>

              <div className="food-card-content">
                <h4 className="food-card-title">{food.name}</h4>
                <p className="food-card-price">₹{food.cost}</p>
                <p className="food-card-rating">⭐ {food.rating}</p>

                <div className="food-card-quantity">
                  <button
                    type="button"
                    data-testid="decrement-count"
                    onClick={() => this.decrementCount(food)}
                  >
                    −
                  </button>

                  <span data-testid="active-count">
                    {quantities[food.id] || 0}
                  </span>

                  <button
                    type="button"
                    data-testid="increment-count"
                    onClick={() => this.incrementCount(food)}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="add-to-cart-container">
          <Link to="/cart">
            <button
              type="button"
              onClick={this.addToCart}
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </Link>
        </div>

        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
