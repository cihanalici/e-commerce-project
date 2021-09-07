import React from 'react';
import { Link, useHistory  } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  let history = useHistory();

  const addToCartHandler = () => {
    if(product.countInStock > 0) {
      history.push(`/cart/${product._id}?qty=1`);
    } else {
      <h2>Product Is Not Avaible For Now!</h2>
    }
   };
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">${product.price}</div>
        <button onClick={addToCartHandler} disabled={product.countInStock === 0}  className="primary block">
          {product.countInStock > 0 ? 'Add to Cart' : 'Is Not Avaible'}
        </button>
      </div>
    </div>
  );
}
