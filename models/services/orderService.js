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

exports.getOrderById = async (orderId)=>{
  const order = await Order.findOne({_id:orderId}).populate('user')
  .populate({
      path: "orderItems",
      model: "OrderItem",
      populate: {
        path: "product",
        model: "Product",
      },
    });
  return order;
}

exports.getOrderByOrderedDate = async (date)=>{
  const orders = await Order.find({});
  let count =0;
  for(let order of orders){
    if(order.orderedDate.toDateString()==date){
      count +=1;
    }
  }
  return count;
}

exports.getOrderByOrderedMonth = async (month, year)=>{
  const orders = await Order.find({});
  let count =0;
  for(let order of orders){
    if(order.orderedDate.toDateString().substring(4,7)==month&&order.orderedDate.toDateString().substring(11,15)==year){
      count +=1;
    }
  }
  return count;
}