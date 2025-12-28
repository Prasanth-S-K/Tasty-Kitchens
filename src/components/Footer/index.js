import './index.css'
import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

const Footer = () => (
  <footer className='footer-container'>
    <div className='logo-container'>
      <img
        src='https://res.cloudinary.com/dtfndvjsg/image/upload/v1765371306/Frame_275_hu02gv.svg'
        alt='website-footer-logo'
        className='footer-logo'
      />
      <h1 className='footer-title'>Tasty Kitchens</h1>
    </div>
    <p className='footer-description'>
      The only thing we are serious about is food.
      <br /> Contact us on
    </p>

    <div className='social-icons-container'>
      <FaPinterestSquare
        data-testid='pintrest-social-icon'
        className='social-icon'
        testid='pintrest-social-icon'
      />
      <FaInstagram
        data-testid='instagram-social-icon'
        className='social-icon'
        testid='instagram-social-icon'
      />
      <FaTwitter
        data-testid='twitter-social-icon'
        className='social-icon'
        testid='twitter-social-icon'
      />
      <FaFacebookSquare
        data-testid='facebook-social-icon'
        testid='facebook-social-icon'
        className='social-icon'
      />
    </div>
  </footer>
)

export default Footer
