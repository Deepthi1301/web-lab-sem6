var queue = require('./queue')
var stack = require('./stack')

stArr = []
qArr = []

stArr = stack.push(stArr,1)
stArr = stack.push(stArr,2)
stArr = stack.push(stArr,3)
stArr = stack.push(stArr,4)

stArr = stack.pop(stArr)
stArr = stack.pop(stArr)
stArr = stack.pop(stArr)

qArr = queue.enQueue(qArr,9)
qArr = queue.enQueue(qArr,8)
qArr = queue.enQueue(qArr,7)
qArr = queue.enQueue(qArr,6)

qArr = queue.deQueue(qArr)
qArr = queue.deQueue(qArr)
qArr = queue.deQueue(qArr)
