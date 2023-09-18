import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarProductItem = props => {
  const {similarDetails} = props
  const {title, price, imageUrl, brand, rating} = similarDetails

  return (
    <li className="similar-item-container">
      <img src={imageUrl} alt={title} className="similar-img" />
      <h1 className="similar-heading">{title}</h1>
      <p>{brand}</p>
      <div className="price-container">
        <p>Rs {price}/</p>
        <div className="rating-container">
          <p>{rating}</p>
          <AiFillStar />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
