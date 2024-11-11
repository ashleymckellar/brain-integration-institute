import { Link } from 'react-router-dom'
import brainSeal from '../assets/icons/BrainIntegrationSeal.png'

export const Footer = () => {
  return (
    <>
      <div className="flex justify-between">
        <img
          className="logo"
          width="134"
          height="134"
          src={brainSeal}
          alt="Brain Integration Institute"
        />

        <div className="links">
          <Link class="link" to="/">Home</Link>
          <Link class="link" to="/about">About Us</Link>
          <Link class="link" to="/practitioner">Find Practitioner</Link>
          <Link class="link" to="/certification">Certification</Link>
          <Link class="link" to="/">FAQ</Link>
          <Link class="link" to="/">Resources</Link>
        </div>

        <div className="contact-info">
          <h3>Contact Us</h3>
          <div className="location">
            <span className="icon">*</span>
            West Jordan & Midvale, UT
          </div>
          <div className="phone">
            <span className="icon">*</span>
            1-801-910-3400
          </div>
          <div className="email">
            <span className="icon">*</span>
            terriblackberry5@gmail.com
          </div>
        </div>
      </div>
    </>
  )
}
