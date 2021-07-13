const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")("sk_test_51JCVJGHjYooCFmUTMf74KVDHgwtShMulAVfsZdQaf5w6CxoIwjv5kHef7K46gGFVTjyX8DVbRBnY88wCK9wvvawe00wixG1R1y")

const app=express();

app.use(cors());
app.use(express.json());


app.get('/',(request,response)=>response.status(200).send('hello world'))

app.post('/payments/create',async (request,response)=>{
    const total = request.query.total;
    console.log("payment request boom" , total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount : total,
        currency :"usd",
    });
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    })
})

exports.api = functions.https.onRequest(app);