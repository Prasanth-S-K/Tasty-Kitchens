import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import './index.css'

const RestaurantItem = props => {
  const {
    restaurant,
    showCompare = false,
    onCompare,
    compareSelected = false,
    maxReached = false,
  } = props

  const {
    id,
    name,
    imageUrl,
    cuisine,
    isDeliveringNow,
    opensAt,
    userRating: {rating, ratingText},
  } = restaurant

  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    const favourites =
      JSON.parse(localStorage.getItem('favouriteRestaurants')) || []

    const exists = favourites.some(each => each.id === id)
    setIsFavourite(exists)
  }, [id])

  const toggleFavourite = event => {
    event.preventDefault()

    let favourites =
      JSON.parse(localStorage.getItem('favouriteRestaurants')) || []

    const exists = favourites.some(each => each.id === id)

    if (exists) {
      favourites = favourites.filter(each => each.id !== id)
    } else {
      favourites.push(restaurant)
    }

    localStorage.setItem('favouriteRestaurants', JSON.stringify(favourites))
    window.dispatchEvent(new Event('favouritesUpdated'))
    setIsFavourite(prev => !prev)
  }

  const handleCompare = event => {
    event.preventDefault()
    onCompare(restaurant)
  }

  return (
    <li className="restaurant-item">
      {/* Favourites */}
      <button type="button" onClick={toggleFavourite} className="fav-btn">
        {isFavourite ? (
          <FaHeart size={20} color="#e31b23" />
        ) : (
          <FaRegHeart size={20} color="#64748b" />
        )}
      </button>

      {/* Compare function */}

      {showCompare && (
        <button
          type="button"
          className={`compare-btn ${compareSelected ? 'selected' : ''}`}
          onClick={handleCompare}
          disabled={!compareSelected && maxReached}
        >
          {compareSelected ? 'Selected' : 'Compare'}
        </button>
      )}

      <Link to={`/restaurants-list/${id}`} className="restaurant-link">
        <div className="restaurant-row">
          <img src={imageUrl} alt="restaurant" className="restaurant-image" />

          <div className="restaurant-info">
            <h3>{name}</h3>
            <p>{cuisine}</p>

            <div className="rating">
              ⭐ {rating} <span>({ratingText})</span>
            </div>

            <div className="availability">
              {isDeliveringNow === 1 ? (
                <span className="open-now">Open Now</span>
              ) : (
                <span className="closed-now">Opens at {opensAt}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default RestaurantItem
