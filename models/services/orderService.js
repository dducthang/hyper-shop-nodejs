const Order = require('../order');
const OrderItem = require('../orderItem');

exports.getPendingOrders = ()=>{
    const orders = Order.find({status: "Pending"})
    .populate('user')
    .populate({
        path: "orderItems",
        model: "OrderItem",
        populate: {
          path: "product",
          model: "Product",
        },
      });
    return orders
}

exports.getDeliveringOrders = ()=>{
    const orders = Order.find({status: "Delivering"})
    .populate('user')
    .populate({
        path: "orderItems",
        model: "OrderItem",
        populate: {
          path: "product",
          model: "Product",
        },
      });
    return orders
}

exports.getDeliveredOrders = ()=>{
    const orders = Order.find({status: "Delivered"})
    .populate('user')
    .populate({
        path: "orderItems",
        model: "OrderItem",
        populate: {
          path: "product",
          model: "Product",
        },
      });
    return orders
}

exports.updateStatusOrder = async (orderStatus)=>{
  const order = await Order.findOne({_id: orderStatus.id});
  order.status = orderStatus.status;
  order.save();
  return order;
}