const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const authAsAdmin = require("../middleware/authAsAdmin");
const Order = require("../../../00_DAL/models/order");
const Menu = require("../../../00_DAL/models/menu");
const mailer = require("../middleware/send-email");

// Create a new order
router.post("/orders", auth, async (req, res) => {
  let items = req.body.items;

  try {
    for (let item of items) {
      let found = await Menu.findOne({ name: item.name });

      if (!found) {
        res.status(404).send({item: item.name});
        return;
      }
    }

    const order = new Order({
      ...req.body,
      customerID: req.user ? req.user._id : null,
    });

    await order.save();
    if (req.user)
      mailer.sendReceiptEmail(
        req.user.email,
        req.user.name,
        order.items,
        order.totalPrice
      );

    res.status(201).send({ order });
  } catch (err) {
    res.status(400).send({error: err.message});
  }
});

// ADMIN - View all orders
router.get("/admin/orders", authAsAdmin, async (req, res) => {
  try {
    const orders = await Order.find({});

    res.send(orders);
  } catch (err) {
    res.status(500).send();
  }
});

// View the logged in user's orders
router.get("/orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ customerID: req.user._id });

    res.send(orders);
  } catch (err) {
    res.status(500).send();
  }
});

// ADMIN - Update specific order
router.put("/admin/order/update/:id", authAsAdmin, async (req, res) => {
  var id = req.params.id;
  var item = req.body;
  const result = await Order.updateOne({ _id: id }, item);
  res.send(result);
});

module.exports = router;
