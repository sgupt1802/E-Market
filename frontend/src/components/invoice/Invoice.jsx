import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData"
import { useOrderDetailsQuery } from '../../redux/api/orderApi'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import Loader from "../layout/Loader"
import './Invoice.css'
const Invoice = () => {
    const params = useParams()
    const { data, isLoading, error } = useOrderDetailsQuery(params?.id)
    const order = data?.order || {}
    const { shippingInfo, orderItems, paymentInfo, user, totalAmount, orderStatus } = order

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }
    }, [error]);


    if (isLoading) return <Loader />;

    return (
        <>
            <MetaData title={"Order Invoice"} />
            <div className="order-invoice my-5">
                <div className="row d-flex justify-content-center mb-5">
                    <button className="btn btn-success col-md-5">
                        <i className="fa fa-print"></i> Download Invoice
                    </button>
                </div>
                <div id="order_invoice" className="p-3 border border-secondary">
                    <header className="clearfix">
                        <div id="logo">
                            <img src="/images/E-Market-invoice.png" alt="Company Logo" />
                        </div>
                        <h1>INVOICE # {order?._id}</h1>
                        <div id="company" className="clearfix">
                            <div>E-Market</div>
                            <div>
                                Matunga, 400019
                                <br />
                                Mumbai, India
                            </div>
                            <div>(+91)-6006150543</div>
                            <div>
                                <a href="mailto:info@shopit.com">info@e-market.com</a>
                            </div>
                        </div>
                        <div id="project">
                            <div><span>Name</span>{user?.name}</div>
                            <div><span>EMAIL</span>{user?.email}</div>
                            <div><span>PHONE</span>{shippingInfo?.phoneNo}</div>
                            <div>
                                <span>ADDRESS</span>
                                {shippingInfo?.address}, {shippingInfo?.city},{" "}
                                {shippingInfo?.zipCode}, {shippingInfo?.country}
                            </div>
                            <div><span>DATE</span> {new Date(order?.createdAt).toLocaleString("en-IN")}</div>
                            <div><span>Status</span>{paymentInfo?.status}</div>
                        </div>
                    </header>
                    <main>
                        <table className="mt-5">
                            <thead>
                                <tr>
                                    <th className="service">ID</th>
                                    <th className="desc">NAME</th>
                                    <th>PRICE(₹)</th>
                                    <th>QTY</th>
                                    <th>TOTAL(₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems?.map((item) => (
                                    <tr>
                                        <td className="service">{item?.product}</td>
                                        <td className="desc">{item?.name}</td>
                                        <td className="unit">{item?.price}</td>
                                        <td className="qty">{item?.quantity}</td>
                                        <td className="total">{item?.price * item?.quantity}</td>
                                    </tr>
                                ))}


                                <tr>
                                    <td colspan="4">
                                        <b>SUBTOTAL</b>
                                    </td>
                                    <td className="total">{order?.itemsPrice}</td>
                                </tr>

                                <tr>
                                    <td colspan="4">
                                        <b>TAX 15%</b>
                                    </td>
                                    <td className="total">{order?.taxAmount}</td>
                                </tr>

                                <tr>
                                    <td colspan="4">
                                        <b>SHIPPING</b>
                                    </td>
                                    <td className="total">{order?.shippingAmount}</td>
                                </tr>

                                <tr>
                                    <td colspan="4" className="grand total">
                                        <b>GRAND TOTAL(₹)</b>
                                    </td>
                                    <td className="grand total">{order?.totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="notices">
                            <div>NOTICE:</div>
                            <div className="notice">
                                A finance charge of 1.5% will be made on unpaid balances after 30
                                days.
                            </div>
                        </div>
                    </main>
                    <footer>
                        Invoice was created on a computer and is valid without the signature.
                    </footer>
                </div>
            </div>

        </>
    )
}

export default Invoice