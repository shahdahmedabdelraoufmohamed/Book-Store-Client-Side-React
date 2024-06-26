import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "./ProductDetails.css";
import productImg from "../../images/author-book-store-book-cover-06.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndent } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "../../Network/AxiosInstance";
import { AuthContext } from "../../Context/AuthContext";

function ProductDetails(props) {
  const product = {
    category: "Fantasy",
    title: "The Born of Aplex 2",
    author: "Mostafa Hassan",
    price: "$19.99",
    description:
      "Platea mauris in sit aliquam commodo ipsum, pharetra tempus proin diam metus eget quis lobortis commodo scelerisque etiam placerat amet, ipsum cursus euismod risus morbi ut.",
    imageUrl: `${productImg}`, // Replace with actual image URL
  };

  const [movie, setMovie] = useState({});
  // const [book,setBook]=useState({})
  // const [price,setPrice] = useState(0);
  const [amount, setAmount] = useState(1);
  // const localhost='https://django-book-store.onrender.com'
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${localhost}/${book_slug}-book/details`
  //     )
  //     .then((res) =>(setPrice(res.data.book.price),setBook(res.data.book)))
  //     .catch((err) => console.log(err));
  // }, []);


  const handleAmountChange = (e) => {
    // Ensure the value is a positive number
    const newValue = Math.max(1, parseInt(e.target.value, 10) || 1);
    setAmount(newValue);
    // console.log(newValue);
  };


  const dispatch = useDispatch();
  let api = useAxios();
  const localhost = 'https://django-book-store.onrender.com'
  const [cart, setCart] = useState([])
  const { user } = useContext(AuthContext);
  const current_user = (useContext(AuthContext).user) !== null ? (useContext(AuthContext).user.user_id) : 0

  const onAddClicked = (item_id, publisher_id, total_quantity) => {

    api.post(`${localhost}/api-order/${current_user}/cart`, {
      book_id: item_id,
      CustomPublisher_id: publisher_id,
      total_number_of_book: total_quantity,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res.data.cart.cart_items), setCart(res.data.cart.cart_items),
          dispatch({ type: "CART_COUNTER", payload: res.data.cart.cart_items.length })
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <section className="product-details-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-6 text-center">
              <img
                src={props.book.front_img}
                alt={props.book.name}
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 col-lg-4 text-start mt-5 mt-md-0 mt-lg-0">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">{props.book.category_name}</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {props.book.name}
                  </li>
                </ol>
              </nav>
              <p>{props.book.category_name}</p>
              <h2>{props.book.name}</h2>
              <p className="text-muted">by {props.book.author_name}</p>
              <h3>
                EGP: {props.book.price}
                <span className="fs-6 cool-text"> + Free Shipping</span>
              </h3>
              <div className="mt-4">
                <h3>
                  Book Details{" "}
                  <FontAwesomeIcon
                    icon={faIndent}
                    size="2xs"
                    className="ms-2"
                  />
                </h3>
                <p className="mb-0">{movie.overview}</p>
              </div>
              <div>
                <input
                  className="viewbook-input me-3 p-2"
                  type="number"
                  value={amount}
                  min="1"
                  onChange={handleAmountChange}
                />
                <button className="outline-button"
                  onClick={() => onAddClicked(props.book_id, props.publisher, 1)}>
                  Add To Cart</button>
              </div>
              <hr />
              <div>
                <span>Category: {props.book.category_name}</span>
                <span className="ms-3">Tags: fiction, sci-fi, science</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
    </div>
  );
}

export default ProductDetails;
