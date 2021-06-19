const box = document.querySelector('img');
const h2 = document.querySelector('h2');

const OFFSET = 100

box.addEventListener('click', () => {
    alert('It\'s  empty')
    window.close()
})

setTimeout(() => {
    h2.style.visibility = "hidden";
    h2.style.opacity = "0";
    h2.style.transition = "visibility 1s, opacity 2s ease-out";
}, 3000)

document.addEventListener('mousemove', (e) => {
    const mouseX = e.pageX
    const mouseY = e.pageY
    const { x, y, width, height } = box.getBoundingClientRect()

    const xDistance = x - mouseX + width / 2; //adding boxPosition.width/2 to get the distance from center of the image
    const yDistance = y - mouseY + height / 2;
    const xOffset = OFFSET + width / 2;
    const yOffset = OFFSET + height / 2;
    if (Math.abs(xDistance) <= xOffset && Math.abs(yDistance) <= yOffset) {
        setBoxPosition(x + xOffset / xDistance * 10, y + yOffset / yDistance * 10);
    }
})
function setBoxPosition(left, top) {
    const windowBox = document.body.getBoundingClientRect()
    const { width, height } = box.getBoundingClientRect()

    if (distanceFromCenter(left, windowBox.left, width) < 0) {
        left = windowBox.right - width - OFFSET
    }
    if (distanceFromCenter(left, windowBox.right, width) > 0) {
        left = windowBox.left + OFFSET
    }
    if (distanceFromCenter(top, windowBox.top, height) < 0) {
        top = windowBox.bottom - height - OFFSET
    }
    if (distanceFromCenter(top, windowBox.bottom, height) > 0) {
        top = windowBox.top + OFFSET
    }

    box.style.left = `${left}px`
    box.style.top = `${top}px`
}

function distanceFromCenter(boxPosition, mousePosition, boxSize) {
    return boxPosition - mousePosition + boxSize / 2
}