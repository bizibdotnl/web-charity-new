import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
//Switch secret.key with stripe key (komt nog)
const stripe = new Stripe(process.env.YOUR_SECTRET_KEY);

app.use(cors());
app.use(express.json());

//donation endpoint
app.post("/donate", async (req, res)=> {
    try {
        const {amount} =req.body; //Amount in cents
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "eur",
            description: "Donatie",
        });
        res.json({ clientSecret: paymentIntent.client_secret});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

app.listen(5000, () => console.log("Donation API running on http://localhost:5000"));
