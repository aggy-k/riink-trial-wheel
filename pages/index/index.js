//index.js
//获取应用实例
const app = getApp()

Page({
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

  play: function() {
    var awardLen = this.data.wheelItems.length
    var that = this
    var awardIndex = Math.random() * awardLen >>> 0;
    var runNum = 8

    console.log('awardIndex', awardIndex)

    var runDegs = that.data.runDegs || 0
    console.log('deg', runDegs)
    runDegs = runDegs + (360 - runDegs % 360) + (360 * runNum - awardIndex * (360 / awardLen))
    console.log('deg', runDegs)
    that.setData({runDegs})

    var animationRun = wx.createAnimation({
      duration: 4000,
      timingFunction: 'ease'
    })
    that.animationRun = animationRun
    animationRun.rotate(runDegs).step()
    that.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    })

    // 中奖提示
    setTimeout(function () {
      wx.showModal({
        title: 'YAY!',
        content: 'You got a ' + (that.data.wheelItems[awardIndex].item),
        showCancel: false
      })
      // if (awardsConfig.chance) {
      //   that.setData({
      //     btnDisabled: ''
      //   })
      // }
    }, 4000);
  },
  
  onLoad: function () {
    var items = this.data.wheelItems
    var colors = items.concat(items).concat(items).concat(this.data.mysteryBox),
      len = colors.length,
      rotateDeg = 360 / len / 2 + 90,
      // rotateDeg = 360 / len / 2,
      html = [],
      turnNum = 1 / len
        
    var ctx = wx.createCanvasContext('wheel')

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
    this.setData({wheelItems: html})
    console.log(ctx)
    ctx.draw()
  },
  getUserInfo: function(e) {
    
  }
})
