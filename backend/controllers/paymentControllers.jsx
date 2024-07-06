// Creating the stripe checkout session => /api/v1/payment/checkout_session
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
export const stripeCheckoutSession=catchAsyncErrors(
    async(req,res,next)=>{

        const session=await stripe.checkout.session.create({
            
        })
})