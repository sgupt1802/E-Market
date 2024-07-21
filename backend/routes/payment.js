import express from "express";

import {isAuthenticatedUser } from "../middlewares/auth.js"
import { stripeCheckoutSession, stripeWebhook } from "../controllers/paymentControllers.js";

const router = express.Router();

router.route("/payment/checkout_session").post(isAuthenticatedUser, stripeCheckoutSession);

router.route("/payment/webhook").post(stripeWebhook);

export default router;



//whsec_zymFSQSA7lZF15pd2AMZR6zopKWQgMCd
//whsec_64fe5e31069c6ce4ad1848cf32c00942c6db99a15e395b463afd5b4ba8342084