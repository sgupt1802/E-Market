// Creating the stripe checkout session => /api/v1/payment/checkout_session
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Stripe from "stripe";
const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
export const stripeCheckoutSession=catchAsyncErrors(
    async(req,res,next)=>{
        const body=req?.body
        const shipping_rate=body?.itemsPrice > 200 ? "shr_1PZdS6SFrwBJ9KLtXJC6DNCM" :  "shr_1PZdSlSFrwBJ9KLtYTLNN6Zf"

        const session=await stripe.checkout.session.create({
            payment_method_types:['card'],
            success_url:`${process.env.FRONTEND_URL}/me/orders`,
            cancel_url:`${process.env.FRONTEND_URL}`,
            customer_email:req?.user?.email,
            client_reference_id:req?.user?._id?.toString(),
            mode:'payment',
            shipping_options:[]
        });
})