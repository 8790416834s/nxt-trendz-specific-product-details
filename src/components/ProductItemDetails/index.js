// Write your code here
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {productDetails: [], apiStatus: apiStatusConstants.initial, count: 1}

  componentDidMount() {
    this.getProductDetails()
  }

  getFormattedData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    style: data.style,
    title: data.title,
    totalReviews: data.totalReviews,
  })

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const productDetailsApiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(productDetailsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        similarProducts: data.similar_products.map(each =>
          this.getFormattedData(each),
        ),
        title: data.title,
        totalReviews: data.total_reviews,
      }
      this.setState({
        productDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onDecrease = () => {
    this.setState(prevState => ({count: prevState.count - 1}))
  }

  onIncrease = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onClickContinue = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0BBFFF" height="80" width="80" />
    </div>
  )

  renderProductList = () => {
    const {productDetails} = this.state
    const {
      id,
      imageUrl,
      title,
      brand,
      totalReviews,
      rating,
      availability,
      price,
      description,
    } = productDetails
    const {count} = this.state
    return (
      <>
        <Header />
        <div className="product-details-container">
          <img src={imageUrl} alt={title} className="product-image" />
          <div>
            <h1 className="product-title">{title}</h1>
            <p className="product-price">Rs {price}/-</p>
            <div className="product-rating-container">
              <div className="product-rating">
                <BsFillStarFill className="star" />
                <p>{rating}</p>
              </div>

              <p className="product-reviews">{totalReviews} Reviews</p>
            </div>
            <p>{description}</p>
            <p className="product-availability">
              Available:
              <span className="product-head">{availability}</span>
            </p>
            <p className="product-brand">
              Brand:
              <span className="product-head">{brand}</span>
            </p>
            <hr />
            <div className="product-add-btn-container">
              <button
                type="button"
                onClick={this.onDecrease}
                className="button"
              >
                -
              </button>
              <p className="count">{count}</p>
              <button
                type="button"
                onClick={this.onIncrease}
                className="button"
              >
                +
              </button>
            </div>
            <div>
              <button type="button" className="cart-btn">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        {this.renderSimilarProducts()}
      </>
    )
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="error-view"
      />
      <h1>Product Not Found</h1>
      <div className="error-view-container">
        <button
          type="button"
          onClick={this.onClickContinue}
          className="continue-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )

  renderSimilarProducts = () => {
    const {productDetails} = this.state

    return (
      <>
        <h1 className="similar-main-heading">Similar Products</h1>
        <ul className="similar-container">
          {productDetails.similarProducts.map(each => (
            <SimilarProductItem similarDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderSwitchStatement = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderSwitchStatement()}</div>
  }
}
export default ProductItemDetails
