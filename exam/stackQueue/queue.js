function enQueue(arr,val) {
    arr.push(val);
    console.log("Added " + val + " to the queue");
    console.log("Queue: " + arr);
    return arr;
}

function deQueue(arr) {
    var val = arr.shift();
    console.log("Removed " + val + " from the queue");
    console.log("Queue: " + arr);
    return arr;
}

module.exports = {enQueue, deQueue};