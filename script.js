const theBlob = document.getElementById('the-blob')

const topSlideContainer = document.getElementById('top-slide')
const bottomSlideContainer = document.getElementById('bottom-slide')
const leftSlideContainer = document.getElementById('left-slide')
const rightSlideContainer = document.getElementById('right-slide')

const topSlideLimit = document.querySelector('#top-slide .slide-limit')
const bottomSlideLimit = document.querySelector('#bottom-slide .slide-limit')
const leftSlideLimit = document.querySelector('#left-slide .slide-limit')
const rightSlideLimit = document.querySelector('#right-slide .slide-limit')

topSlideLimit.addEventListener('click', fire)
bottomSlideLimit.addEventListener('click', fire)
leftSlideLimit.addEventListener('click', fire)
rightSlideLimit.addEventListener('click', fire)

const topSlideHandle = document.querySelector('#top-slide .slide-handle')
const bottomSlideHandle = document.querySelector('#bottom-slide .slide-handle')
const leftSlideHandle = document.querySelector('#left-slide .slide-handle')
const rightSlideHandle = document.querySelector('#right-slide .slide-handle')

topSlideHandle.addEventListener('mousedown', moveHandle)
bottomSlideHandle.addEventListener('mousedown', moveHandle)
leftSlideHandle.addEventListener('mousedown', moveHandle)
rightSlideHandle.addEventListener('mousedown', moveHandle)

const makeBlobButton = document.getElementById('make-blob-button')
const sharpnessSlider = document.getElementById('sharpness-slider')
const sharpnessValueText = document.getElementById('sharpness-value-text')

const blob = {
  sharpness: (100 - sharpnessSlider.value) / 2,
  xTop: 50,
  xBottom: 50,
  yLeft: 50,
  yRight: 50,
  borderRadius: '',
  randomizeBlob() {
    this.xTop = randomSharpness(this.sharpness)
    this.xBottom = randomSharpness(this.sharpness)
    this.yLeft = randomSharpness(this.sharpness)
    this.yRight = randomSharpness(this.sharpness)
    drawHandles()
    this.drawBlob()
  },
  drawBlob() {
    this.borderRadius = `${this.xTop}% ${100 - this.xTop}% ${
      100 - this.xBottom
    }% ${this.xBottom}% / ${this.yLeft}% ${this.yRight}% ${
      100 - this.yRight
    }% ${100 - this.yLeft}%`
    theBlob.style.borderRadius = this.borderRadius
    makeBlobButton.style.borderRadius = this.borderRadius
    drawHandles()
  },
  setSliders() {
    topSlideLimit.style.width = `${sharpnessSlider.value}%`
    bottomSlideLimit.style.width = `${sharpnessSlider.value}%`
    leftSlideLimit.style.height = `${sharpnessSlider.value}%`
    rightSlideLimit.style.height = `${sharpnessSlider.value}%`
  },
  initializeBlob() {
    this.setSliders()
    this.randomizeBlob()
    this.drawBlob()
  }
}

blob.initializeBlob()

makeBlobButton.addEventListener('click', () => {
  blob.randomizeBlob()
})

sharpnessSlider.oninput = function () {
  blob.sharpness = (100 - sharpnessSlider.value) / 2
  sharpnessValueText.innerText = `${sharpnessSlider.value}%`
  blob.setSliders()
}

function drawHandles() {
  topSlideHandle.style.left = `${blob.xTop}%`
  bottomSlideHandle.style.left = `${blob.xBottom}%`
  leftSlideHandle.style.top = `${blob.yLeft}%`
  rightSlideHandle.style.top = `${blob.yRight}%`
}

function fire(event) {
  const boundingBox = this.parentNode.getBoundingClientRect()
  const width = boundingBox.width
  const height = boundingBox.height

  if (width > height) {
    const border = boundingBox.left
    const position = event.clientX - border
    if (this.parentNode.id === 'top-slide') {
      blob.xTop = (position / width) * 100
    } else {
      blob.xBottom = (position / width) * 100
    }
  } else {
    const border = boundingBox.top
    const position = event.clientY - border
    if (this.parentNode.id === 'left-slide') {
      blob.yLeft = (position / height) * 100
    } else {
      blob.yRight = (position / height) * 100
    }
  }

  blob.drawBlob()
}

function moveHandle(event) {
  const handle = this
  const boundingBox = handle.parentNode.getBoundingClientRect()
  const width = boundingBox.width
  const height = boundingBox.height

  window.addEventListener('mousemove', followMouse)
  window.addEventListener('mouseup', stopFollowingMouse)

  function followMouse(event) {
    if (width > height) {
      const border = boundingBox.left
      const position = event.clientX - border
      if (handle.parentNode.id === 'top-slide') {
        blob.xTop = (position / width) * 100
      } else {
        blob.xBottom = (position / width) * 100
      }
    } else {
      const border = boundingBox.top
      const position = event.clientY - border
      if (handle.parentNode.id === 'left-slide') {
        blob.yLeft = (position / height) * 100
      } else {
        blob.yRight = (position / height) * 100
      }
    }
    blob.drawBlob()
  }
  function stopFollowingMouse() {
    window.removeEventListener('mousemove', followMouse)
    window.removeEventListener('mouseup', stopFollowingMouse)
  }
}

function toCorner(x, y) {
  if (x === 0) {
    if (y === 0) {
      // left top
      blob.xTop = blob.sharpness
      blob.yLeft = blob.sharpness
    } else {
      // left bottom
      blob.xBottom = blob.sharpness
      blob.yLeft = 100 - blob.sharpness
    }
  } else if (x === 1) {
    if (y === 0) {
      // right top
      blob.xTop = 100 - blob.sharpness
      blob.yRight = blob.sharpness
    } else {
      // right bottom
      blob.xBottom = 100 - blob.sharpness
      blob.yRight = 100 - blob.sharpness
    }
  }
  blob.drawBlob()
}

function randomSharpness(maxSharpness) {
  return Math.floor(Math.random() * (100 - maxSharpness * 2) + maxSharpness)
}
