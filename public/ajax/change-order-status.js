const orderStatus = document.querySelectorAll('.data-status');
const url = "http://localhost:4000/api/order/change-status"


const xchangeStatusHandler = (e)=>{
    let statusStr = e.currentTarget.id;
    let parent = e.currentTarget.closest('.dropdown-menu');
    console.log(parent.getAttribute("data-status"))
    const index = statusStr.indexOf('-');
    const id = statusStr.substring(index+1);
    const status = statusStr.substring(0,index);
    console.log(status);
}


const changeStatusHandler=async(e)=>{
    let statusStr = e.currentTarget.id;
    const index = statusStr.indexOf('-');
    const id = statusStr.substring(index+1);
    const status = statusStr.substring(0,index);
    const itemStatus ={
        id:id,
        status: status,
    }

    let currentStatus = e.currentTarget.closest('.dropdown-menu').getAttribute("data-status");
    if(currentStatus!=status){
        await fetch(url,{
            method:"POST",
            body: JSON.stringify(itemStatus),
            headers:{
                'Content-type':'application/json; charset=utf-8'
            }
        }).then(response=>{
            if (response.status>= 200 && response.status<300){
                return response.json().then(order=>{
                        const oldRow = document.getElementById(id);
                        oldRow.remove();
                        let table;
                        if(order.status=="Delivering"){
                            table = document.getElementById('delivering-table');
                        }
                        if(order.status=="Delivered"){
                            table = document.getElementById('delivered-table');
                        }
                        if(order.status=="Pending"){
                            table = document.getElementById('pending-table');
                        }
                        table.querySelector('');
                        const row = document.createElement('tr');
                        row.setAttribute('id',order._id);
                        row.innerHTML=`
                            <th scope="row">00</th>
                            <td>${order.name}</td>
                            <td>${order.phone}</td>
                            <td>${order.address}</td>
                            <td>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                        ${order.status}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <div class="order-status">
                                            <div class="dropdown-item card-item" id="Pending-${order._id}>Pending</div>
                                            <div class="dropdown-item card-item" id="Delivering-${order._id}">Delivering</div>
                                            <div class="dropdown-item card-item" id="Delivered-${order._id}">Delivered</div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        `
                        table.appendChild(row);
                    } 
                );
            }else{
                response.json().then(error=>{
                    console.log('ERROR: '+error);
                });
            }
        }).catch(error=>{
            console.log(error);
        })
    }
}

for(let status of orderStatus){
    status.addEventListener('click', changeStatusHandler);
}