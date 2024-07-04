import React from 'react'
import MetaData from '../layout/MetaData'
const ConfirmOrder = () => {
    return (
        <>
            <MetaData title={"Confirm Order Info"}/>

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> John Doe</p>
                    <p><b>Phone:</b> 123-456-7890</p>
                    <p className="mb-4">
                        <b>Address:</b> 123 Main St, Cityville, 12345, Country
                    </p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    <hr />
                    <div className="cart-item my-1">
                        <div className="row">
                            <div className="col-4 col-lg-2">
                                <img
                                    src="../images/product.jpg"
                                    alt="Laptop"
                                    height="45"
                                    width="65"
                                />
                            </div>

                            <div className="col-5 col-lg-6">
                                <a href="#">Product 1</a>
                            </div>

                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                <p>3 x $499.99 = <b>$1499.97</b></p>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal: <span className="order-summary-values">$1499.97</span></p>
                        <p>Shipping: <span className="order-summary-values">$10.00</span></p>
                        <p>Tax: <span className="order-summary-values">$150.00</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">$1659.97</span></p>

                        <hr />
                        <a href="/payment" id="checkout_btn" className="btn btn-primary w-100">
                            Proceed to Payment
                        </a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConfirmOrder