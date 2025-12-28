import './index.css'
import {BiSearch} from 'react-icons/bi'

const Search = props => {
  const {searchInput, onChangeSearch, onSearch} = props

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="search-container">
      <BiSearch className="search-icon" />
      <input
        type="search"
        placeholder="Search restaurants"
        value={searchInput}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className="search-input"
      />
      <button type="button" onClick={onSearch} className="search-button">
        Search
      </button>
    </div>
  )
}

export default Search
