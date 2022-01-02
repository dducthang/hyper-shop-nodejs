const OrderService = require('../Models/services/orderService');

exports.getOrders = async (req,res,next)=>{
    const pendingOrders = await OrderService.getPendingOrders();
    const deliveringOrders = await OrderService.getDeliveringOrders();
    const deliveredOrders = await OrderService.getDeliveredOrders();
    res.status(200).render('shop/orders', {
        user: req.user,
        pageTitle: "Orders",
        pendingOrders,
        deliveringOrders,
        deliveredOrders
    });
}

exports.getOrder = async (req,res,next)=>{
    const orderId = req.params.orderId;
    const order = await OrderService.getOrderById(orderId);
    res.status(200).render('shop/orderDetail',{
        user: req.user,
        pageTitle: "Order Detail",
        order
    })
}
