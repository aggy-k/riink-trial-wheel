// pages/test/test.js
Page({

  /**
   * Page initial data
   */
  data: {
    wheelItems: [
      { color: '#00BFD3', icon: '/images/Burger.svg', item: 'Burger' },
      { color: '#F1AF2D', icon: '/images/Drink.svg', item: 'Drink' },
      { color: '#9B42A9', icon: '/images/Skate.svg', item: 'Skate' }
    ],
    mysteryBox: [
      { color: '#FFF', icon: '/images/mystery_box.png', item: '????' }
    ],
    runDegs: 0 
  },
  onLoad: function () {
    var items = this.data.wheelItems
    var colors = items.concat(items).concat(items).concat(this.data.mysteryBox),
      len = colors.length,
      rotateDeg = 360 / len / 2 + 90,
      // rotateDeg = 360 / len / 2,
      html = [],
      turnNum = 1 / len

    var ctx = wx.createCanvasContext('test')

    ctx.save();
    ctx.beginPath();
    ctx.translate(150, 150);
    ctx.moveTo(0, 0);
    // Draw coordinates

    // ctx.rotate((360 / len * 0 - rotateDeg) * Math.PI / 180);

    ctx.arc(0, 0, 150, 0, 2 * Math.PI / len, false)
    ctx.setFillStyle(colors[0]['color'])
    ctx.fill()

    // ctx.restore()
    // ctx.moveTo(150,150)
    // ctx.beginPath()
    ctx.setFillStyle('red')
    ctx.fillRect(240,170,35,35)
    
    // ctx.fill()

    // ctx.drawImage('/images/Skate.svg', 100, 20, 35, 35);


    // ctx.setLineWidth(1.0);
    // ctx.setStrokeStyle('#000');
    // ctx.stroke();

    // ctx.restore()
    
    this.setData({ wheelItems: html })
    console.log(ctx)

    ctx.draw()
  },
})