const filterPending = document.getElementById('filter-pending');
const filterDelivering = document.getElementById('filter-delivering');
const filterDelivered = document.getElementById('filter-delivered');

const pendingTable = document.getElementById('pending-table');
const deliveringTable = document.getElementById('delivering-table');
const deliveredTable = document.getElementById('delivered-table');

const togglePendingTable = ()=>{
    pendingTable.classList.remove('hidden');
    deliveringTable.classList.add('hidden');
    deliveredTable.classList.add('hidden');
}
const toggleDeliveringTable = ()=>{
    pendingTable.classList.add('hidden');
    deliveringTable.classList.remove('hidden');
    deliveredTable.classList.add('hidden');
}
const toggleDeliveredTable = ()=>{
    pendingTable.classList.add('hidden');
    deliveringTable.classList.add('hidden');
    deliveredTable.classList.remove('hidden');
}

filterPending.addEventListener('click', togglePendingTable);
filterDelivering.addEventListener('click', toggleDeliveringTable);
filterDelivered.addEventListener('click', toggleDeliveredTable);