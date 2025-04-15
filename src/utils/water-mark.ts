/**
 * 添加水印
 * @param key dom id
 * @param text 水印内容
 */
const add = (key: string, text: string) => {
  let canvasDom = document.getElementById(key)

  if (!canvasDom) {
    const can = document.createElement('canvas') as HTMLCanvasElement
    // // 设置canvas画布大小
    // can.width = 120
    // can.height = 96

    const fontSize = 14

    const cans = can.getContext('2d') as CanvasRenderingContext2D
    cans.font = `${fontSize}px microsoft yahei` //水印的字体大小

    // 动态计算文字宽度和高度
    const textWidth = cans.measureText(text).width;
    const padding = 50; // 给文字留出额外的间距
    can.width = textWidth + padding;
    can.height = fontSize * 3 + padding; // 高度为字体大小的 3 倍，避免文字被截断

    cans.clearRect(0, 0, can.width, can.height);
    cans.rotate((-20 * Math.PI) / 180) // 水印旋转角度
    cans.font = `${fontSize}px microsoft yahei` //水印的字体大小
    cans.fillStyle = '#000' //水印的字体颜色
    cans.textAlign = 'center' //水印的位置
    cans.textBaseline = 'middle'
    cans.fillText(text, can.width / 2, can.height) // 水印在画布的位置x，y轴
    const div = document.createElement('div')
    div.id = key
    div.style.pointerEvents = 'none'
    div.style.top = '10px'
    div.style.left = '0px'
    div.style.opacity = '0.1'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
  }
}

/**
 * 移除水印
 * @param key dom id
 */
const remove = (key: string) => {
  const watermark = document.getElementById(key)
  if (watermark) {
    document.body.removeChild(watermark)
  }
}

export default {
  add,
  remove,
}
