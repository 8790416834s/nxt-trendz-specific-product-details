import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarProductItem = props => {
  const {similarDetails} = props
  const {title, price, imageUrl, brand, rating} = similarDetails

  return (
    <li className="similar-container">
      <img src={imageUrl} alt={title} />
      <h1>{title}</h1>
      <p>{brand}</p>
      <div>
        <p>Rs {price}/</p>
        <div>
          <p>{rating}</p>
          <AiFillStar />
        </div>
      </div>
    </li>
  )
}
export default SimilarProductItem
