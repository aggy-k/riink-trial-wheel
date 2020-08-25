// wheel.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
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
  lifetimes: {
    attached() {
      console.log('wheel ready')
      var items = this.data.wheelItems
      var colors = items.concat(items).concat(items).concat(this.data.mysteryBox),
        len = colors.length,
        rotateDeg = 360 / len / 2 + 90,
        // rotateDeg = 360 / len / 2,
        html = [],
        turnNum = 1 / len
      console.log('colors', colors)
      var ctx = wx.createCanvasContext('wheel')
      console.log('ctx', ctx)

      for (var i = 0; i < len; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(150, 150);
        ctx.moveTo(0, 0);
        // Draw coordinates
        ctx.rotate((360 / len * i - rotateDeg) * Math.PI / 180);
        ctx.arc(0, 0, 150, 0, 2 * Math.PI / len, false)
        ctx.setFillStyle(colors[i]['color'])
        ctx.fill()

        // ctx.setLineWidth(1.0);
        // ctx.setStrokeStyle('#000');
        // ctx.stroke();

        ctx.restore()
        html.push({ turn: (i * turnNum) + 'turn', icon: colors[i].icon, item: colors[i].item });
        // html.push({ turn: (i * turnNum) + 0.25 + 'turn', icon: colors[i].icon, item: colors[i].item });        
      }
      console.log('ctx after',ctx)
      this.setData({ wheelItems: html })
      ctx.draw()
      console.log('data', this.data)
    },
  },

  methods: {
    play() {
      
    },
  }
})
