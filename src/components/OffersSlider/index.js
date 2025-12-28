import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const OffersSlider = ({offers}) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }

  return (
    <div className="offers-slider">
      <Slider {...settings}>
        {offers.map(each => (
          <div key={each.id}>
            <img src={each.imageUrl} alt="offer" className="offer-image" />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default OffersSlider
