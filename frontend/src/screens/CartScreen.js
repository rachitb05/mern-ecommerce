import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {
  Link,
  useParams,
  Navigate,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
const CartScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let qty = searchParams.get("qty") || "";
  qty = qty === "" ? 1 : Number(qty);
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { cartItems } = cart;
  useEffect(() => {
    if (id) dispatch(addToCart(id, qty));
  }, [dispatch, id, qty]);
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleCheckout = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your Cart is Empty <Link to="/">Go Back</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`} className="link">
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    ₹ {new Intl.NumberFormat("en-IN").format(item.price)}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        handleRemoveFromCart(item.product);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((accum, item) => accum + item.qty, 0)}) items
              </h2>
              ₹
              {new Intl.NumberFormat('en-IN').format(cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2))}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn w-100"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
