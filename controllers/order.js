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
