import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'
import './index.css'

class FavouriteRestaurants extends Component {
  state = {
    favourites: [],
    compareList: [],
  }

  componentDidMount() {
    const favourites =
      JSON.parse(localStorage.getItem('favouriteRestaurants')) || []

    this.setState({favourites})
  }

  toggleCompare = restaurant => {
    this.setState(prevState => {
      const exists = prevState.compareList.some(
        each => each.id === restaurant.id,
      )

      if (exists) {
        return {
          compareList: prevState.compareList.filter(
            each => each.id !== restaurant.id,
          ),
        }
      }

      if (prevState.compareList.length === 2) {
        return prevState
      }

      return {
        compareList: [...prevState.compareList, restaurant],
      }
    })
  }

  render() {
    const {favourites, compareList} = this.state

    return (
      <>
        <Header />

        <div className="favourites-container">
          <h1>Your Favourite Restaurants</h1>

          {favourites.length === 0 ? (
            <p className="empty-text">No favourite restaurants added yet ❤️</p>
          ) : (
            <ul className="restaurants-list">
              {favourites.map(each => (
                <RestaurantItem
                  key={each.id}
                  restaurant={each}
                  showCompare
                  onCompare={this.toggleCompare}
                  compareSelected={compareList.some(r => r.id === each.id)}
                  maxReached={compareList.length === 2}
                />
              ))}
            </ul>
          )}

          {compareList.length === 2 && (
            <div className="comparison-table">
              <h2>Compare Restaurants</h2>

              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>{compareList[0].name}</th>
                    <th>{compareList[1].name}</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Rating</td>
                    <td>{compareList[0].userRating.rating}</td>
                    <td>{compareList[1].userRating.rating}</td>
                  </tr>

                  <tr>
                    <td>Cost for Two</td>
                    <td>₹{compareList[0].costForTwo}</td>
                    <td>₹{compareList[1].costForTwo}</td>
                  </tr>

                  <tr>
                    <td>Cuisine</td>
                    <td>{compareList[0].cuisine}</td>
                    <td>{compareList[1].cuisine}</td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td>
                      <span
                        className={
                          compareList[0].isDeliveringNow ? 'open' : 'closed'
                        }
                      >
                        {compareList[0].isDeliveringNow ? 'Open' : 'Closed'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={
                          compareList[1].isDeliveringNow ? 'open' : 'closed'
                        }
                      >
                        {compareList[1].isDeliveringNow ? 'Open' : 'Closed'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <Footer />
      </>
    )
  }
}

export default FavouriteRestaurants
