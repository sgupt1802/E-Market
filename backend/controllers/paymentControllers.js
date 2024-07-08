// Creating the stripe checkout session => /api/v1/payment/checkout_session
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
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
            success_url: `${process.env.FRONTEND_URL}/me/orders`,
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
        });

        res.status(200)?.json({
            url: session.url
        })
    })


const getOrderItems=async()

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
                const line_items=await stripe.chechout.sessions.listLineItems(session.id)

                const orderItems=await getOrderItems(line_items)
                res.status(200).json({
                    success:true
                })
            }


        } catch (error) {
            console.log("===============================================")
            console.log("Error=> ", error);
            console.log("===============================================")

        }
    })
