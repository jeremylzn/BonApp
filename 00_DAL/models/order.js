const mongoose = require("mongoose");
const moment = require("moment");

// Item Sub-Schema that will populate orderSchema 'items' field.
const itemSubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, { _id: false });
// User Sub-Schema that will populate orderSchema 'customerDetails' field.
const customerSubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
}, { _id: false });

const orderSchema = new mongoose.Schema({
    orderID: {
        type: Number,
    },
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
    customerDetails: {
        type: customerSubSchema,
        required: true,
    },
    items: {
        type: [itemSubSchema],
        required: true,
    },
    notes: {
        type: String,
        default: ''
    },
    completed: {
        type: Boolean,
        default: false,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
});

// This function runs before saving the new order and does the following:
// 1. Calculate the total price of the order into 'totalPrice' property
// 2. Get the date and time of the order into 'date' and 'time' properties
// .........................................................................
orderSchema.pre("save", async function(next) {
    const order = this;

    order.items.forEach((item) => {
        order.totalPrice += item.price * item.quantity;
    });

    const today = new moment();
    let currentDate = today.format("DD-MM-YYYY");
    let currentTime = today.format("HH:mm:ss");

    order.orderID = Math.floor(Math.random() * 999 + 1);
    order.date = currentDate;
    order.time = currentTime;

    next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;