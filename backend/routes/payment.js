import express from "express";

import {isAuthenticatedUser } from "../middlewares/auth.js"
import { stripeCheckoutSession } from "../controllers/paymentControllers.jsx";

const router = express.Router();

router.route("/payment/checkout_session").post(isAuthenticatedUser, stripeCheckoutSession);

export default router;