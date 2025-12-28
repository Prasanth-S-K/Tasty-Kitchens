import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import {GrPrevious, GrNext} from 'react-icons/gr'
import RestaurantItem from '../RestaurantItem'
import './index.css'
import Header from '../Header'
import OffersSlider from '../OffersSlider'
import Footer from '../Footer'
import Search from '../Search'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const LIMIT = 9

class Home extends Component {
  state = {
    offers: [],
    restaurants: [],
    activePage: 1,
    total: 0,
    selectedSortBy: 'Lowest',
    searchInput: '',
    isLoadingOffers: true,
    isLoadingRestaurants: true,
  }

  componentDidMount() {
    this.getOffers()
    this.getRestaurants()
  }

  getOffers = async () => {
    this.setState({isLoadingOffers: true})
    const jwtToken = Cookies.get('jwt_token')
    const options = {headers: {Authorization: `Bearer ${jwtToken}`}}
    const response = await fetch(
      'https://apis.ccbp.in/restaurants-list/offers',
      options,
    )
    if (response.ok) {
      const data = await response.json()

      const camelCaseOffers = data.offers.map(offer => ({
        id: offer.id,
        imageUrl: offer.image_url,
      }))

      // console.log('GetOffers : ', camelCaseOffers)
      this.setState({offers: camelCaseOffers, isLoadingOffers: false})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearch = () => {
    this.setState({activePage: 1}, this.getRestaurants)
  }

  getRestaurants = async () => {
    this.setState({isLoadingRestaurants: true})
    const jwtToken = Cookies.get('jwt_token')
    const {activePage, selectedSortBy, searchInput} = this.state

    const offset = (activePage - 1) * LIMIT
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortBy}&search=${searchInput}`

    const options = {headers: {Authorization: `Bearer ${jwtToken}`}}
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const camelCaseRestaurants = data.restaurants.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        imageUrl: restaurant.image_url,
        cuisine: restaurant.cuisine,
        costForTwo: restaurant.cost_for_two,
        opensAt: restaurant.opens_at,
        isDeliveringNow: restaurant.is_delivering_now,
        userRating: {
          rating: restaurant.user_rating.rating,
          ratingText: restaurant.user_rating.rating_text,
        },
      }))

      localStorage.setItem(
        'restaurantsCache',
        JSON.stringify(camelCaseRestaurants),
      )

      this.setState({
        restaurants: camelCaseRestaurants,
        total: data.total,
        isLoadingRestaurants: false,
      })
    }
  }

  onChangeSort = event => {
    this.setState({selectedSortBy: event.target.value}, this.getRestaurants)
  }

  onLeftClick = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState({activePage: activePage - 1}, this.getRestaurants)
    }
  }

  onRightClick = () => {
    const {activePage, total} = this.state
    const totalPages = Math.ceil(total / LIMIT)
    if (activePage < totalPages) {
      this.setState({activePage: activePage + 1}, this.getRestaurants)
    }
  }

  renderRestaurants = () => {
    const {isLoadingRestaurants, restaurants, searchInput} = this.state

    if (isLoadingRestaurants) {
      return (
        <div data-testid="restaurants-list-loader" className="loader-container">
          <Loader type="TailSpin" color="#F7931E" height={40} width={40} />
        </div>
      )
    }

    if (restaurants.length === 0) {
      return (
        <div className="no-results-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-restaurants-img.png"
            alt="no restaurants"
          />
          <h1>No Results Found</h1>
          <p>Try searching with a different restaurant name</p>
        </div>
      )
    }

    return (
      <ul className="restaurants-list">
        {restaurants.map(each => (
          <RestaurantItem
            key={each.id}
            restaurant={each}
            searchInput={searchInput}
            highlightText={this.highlightText}
          />
        ))}
      </ul>
    )
  }

  highlightText = (text, query) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, i) => {
      const key = `${part}-${i}`

      return part.toLowerCase() === query.toLowerCase() ? (
        <span key={key} className="highlight-text">
          {part}
        </span>
      ) : (
        <span key={key}>{part}</span>
      )
    })
  }

  render() {
    const {
      offers,
      isLoadingOffers,
      selectedSortBy,
      activePage,
      total,
      searchInput,
    } = this.state
    const totalPages = Math.ceil(total / LIMIT)

    return (
      <>
        <Header />
        <div className="home-container">
          {/* =============================================Offer Slider=============================  */}
          {isLoadingOffers ? (
            <div
              data-testid="restaurants-offers-loader"
              className="loader-container"
            >
              <Loader type="TailSpin" color="#F7931E" height={40} width={40} />
            </div>
          ) : (
            <OffersSlider offers={offers} />
          )}
          {/* =============================================Sort Container=============================  */}
          <div className="sort-container">
            <div>
              <h1>Popular Restaurants</h1>
              <p className="sort-container-para">
                Select your favourite restaurant special dish and make your day
                happy...
              </p>
            </div>
            <div className="sort-option-container">
              <BsFilterLeft className="filter-icon" />
              <p>Sort By</p>
              <select value={selectedSortBy} onChange={this.onChangeSort}>
                {sortByOptions.map(option => (
                  <option key={option.id} value={option.value}>
                    {option.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <hr />
          {/* ============================================== Search Bar ================================== */}
          <Search
            searchInput={searchInput}
            onChangeSearch={this.onChangeSearch}
            onSearch={this.onSearch}
          />
          <hr />
          {/* =============================================Restaurents Lists=============================  */}
          {this.renderRestaurants()}
          <hr />
          {/* =============================================Pagination Container=============================  */}
          <div className="pagination-container">
            <button
              data-testid="pagination-left-button"
              type="button"
              onClick={this.onLeftClick}
            >
              <GrPrevious />
            </button>
            <span data-testid="active-page-number">
              {activePage} of {totalPages}
            </span>

            <button
              data-testid="pagination-right-button"
              type="button"
              onClick={this.onRightClick}
            >
              <GrNext />
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
