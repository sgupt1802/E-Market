// Creating the stripe checkout session => /api/v1/payment/checkout_session
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from '../models/order.js'
import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export const stripeCheckoutSession = catchAsyncErrors(
    async (req, res, next) => {

        const body = req?.body

        const shippingInfo = body?.shippingInfo

        const shipping_rate = body?.itemsPrice >= 200 ? "shr_1PZdS6SFrwBJ9KLtXJC6DNCM" : "shr_1PZdSlSFrwBJ9KLtYTLNN6Zf"

        const line_items = body?.orderItems?.map((item) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item?.name,
                        images: [item?.image],
                        metadata: { productId: item?.product },

                    },
                    unit_amount: item?.price * 100
                },
                tax_rates: ["txr_1PZdewSFrwBJ9KLtH83qbZAX"],
                quantity: item?.quantity,
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${process.env.FRONTEND_URL}/me/orders?order_success=true`,
            cancel_url: `${process.env.FRONTEND_URL}`,
            customer_email: req?.user?.email,
            client_reference_id: req?.user?._id?.toString(),
            mode: 'payment',
            metadata: { ...shippingInfo, itemsPrice: body?.itemsPrice },
            shipping_options: [
                {
                    shipping_rate
                }
            ],
            line_items,
            shipping_address_collection: {
                allowed_countries: ['AC', 'AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CV', 'CW', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MK', 'ML', 'MM', 'MN', 'MO', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SZ', 'TA', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VN', 'VU', 'WF', 'WS', 'XK', 'YE', 'YT', 'ZA', 'ZM', 'ZW'], // Add other countries if neede
            },
            billing_address_collection: 'required',
        });

        res.status(200)?.json({
            url: session.url
        })
    })


const getOrderItems = async (line_items) => {
    return new Promise((resolve, reject) => {
        let cartItems = [];


        line_items?.data?.forEach(async (item) => {
            const product = await stripe.products.retrieve(item.price.product)    //this is the stripe product_id
            const productId = product.metadata.productId;

            cartItems.push({
                product: productId,
                name: product.name,
                price: item.price.unit_amount_decimal / 100,
                quantity: item.quantity,
                image: product.images[0]
            })

            if (cartItems.length === line_items.data.length) {
                resolve(cartItems)
            }
        })
    })
}

//create new order after payment => api/v1/payment/webhook

export const stripeWebhook = catchAsyncErrors(
    async (req, res, next) => {
        try {

            const signature = req.headers['stripe-signature']
            const event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            if (event.type === 'checkout.session.completed') {
                const session = event.data.object
                const line_items = await stripe.checkout.sessions.listLineItems(session.id)

                const orderItems = await getOrderItems(line_items)

                const user = session.client_reference_id
                const totalAmount = session.amount_total / 100
                const taxAmount = session.total_details.amount_tax / 100
                const shippingAmount = session.total_details.amount_shipping / 100
                const itemsPrice = session.metadata.itemsPrice

                const shippingInfo = {
                    address: session.metadata.address,
                    city: session.metadata.city,
                    phoneNo: session.metadata.phoneNo,
                    zipCode: session.metadata.zipCode,
                    country: session.metadata.country,
                };


                const paymentInfo = {
                    id: session.payment_intent,
                    status: session.payment_status,

                }

                const orderData = {
                    shippingInfo,
                    orderItems,
                    itemsPrice,
                    taxAmount,
                    shippingAmount,
                    totalAmount,
                    paymentInfo,
                    paymentMethod: "Card",
                    user,
                }

                await Order.create(orderData)

                res.status(200).json({
                    success: true
                })
            }


        } catch (error) {
            console.log("Error=> ", error);
        }
    })
