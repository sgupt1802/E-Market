import React from 'react'

const CheckoutSteps = () => {
    return (
        <>
            <div className="checkout-progress d-flex justify-content-center mt-5 row">
               
                <a
                    href="/shipping"
                    className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                >
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Shipping</div>
                    <div className="triangle-active"></div>
                </a>

             
                <a
                    href="#!"
                    className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                    disabled
                >
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping</div>
                    <div className="triangle-incomplete"></div>
                </a>

               
                <a
                    href="/confirm_order"
                    className="float-right mt-2 mt-md-0 col-12 col-md-4 col-lg-3"
                >
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Confirm Order</div>
                    <div className="triangle-active"></div>
                </a>

              
                <a
                    href="#!"
                    className="float-right mt-2 mt-md-0 col-12 col-md-4 col-lg-3"
                    disabled
                >
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Confirm Order</div>
                    <div className="triangle-incomplete"></div>
                </a>

              
                <a
                    href="/payment_method"
                    className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                >
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Payment</div>
                    <div className="triangle-active"></div>
                </a>

                <a
                    href="#!"
                    className="float-right mt-2 mt-md-0 col-12 col-md-3 col-lg-2"
                    disabled
                >
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div>
                </a>
            </div>
        </>
    )
}

export default CheckoutSteps