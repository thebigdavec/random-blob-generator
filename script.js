const theBlob = document.getElementById('the-blob')

const topSlide = document.getElementById('top-slide')
const bottomSlide = document.getElementById('bottom-slide')
const leftSlide = document.getElementById('left-slide')
const rightSlide = document.getElementById('right-slide')
const makeBlobButton = document.getElementById('make-blob-button')
const sharpnessSlider = document.getElementById('sharpness-slider')
const sharpnessValueText = document.getElementById('sharpness-value-text')
let maxSharpness = (100 - sharpnessSlider.value) / 2

sharpnessSlider.oninput = function () {
  maxSharpness = (100 - sharpnessSlider.value) / 2
  sharpnessValueText.innerText = `${sharpnessSlider.value}%`
}

makeBlobButton.addEventListener('click', makeBlob)

function makeBlob() {
  const xTop = randomSharpness(maxSharpness)
  const xBottom = randomSharpness(maxSharpness)
  const yLeft = randomSharpness(maxSharpness)
  const yRight = randomSharpness(maxSharpness)

  topSlide.style.left = `${xTop}%`
  bottomSlide.style.left = `${xBottom}%`
  leftSlide.style.top = `${yLeft}%`
  rightSlide.style.top = `${yRight}%`

  theBlob.style.borderRadius = `${xTop}% ${100 - xTop}% ${
    100 - xBottom
  }% ${xBottom}% / ${yLeft}% ${yRight}% ${100 - yRight}% ${100 - yLeft}%`
  makeBlobButton.style.borderRadius = `${xTop}% ${100 - xTop}% ${
    100 - xBottom
  }% ${xBottom}% / ${yLeft}% ${yRight}% ${100 - yRight}% ${100 - yLeft}%`
}

function randomSharpness(maxSharpness) {
  return Math.floor(Math.random() * (100 - maxSharpness * 2) + maxSharpness)
}
