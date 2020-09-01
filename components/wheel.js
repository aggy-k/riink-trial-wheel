// components/wheel.js
Component({
  properties: {
    wheelItems: {type: Array, value: []}
  },

  data: {
    runDegs: 0,
    btnDisabled: false
  },
  lifetimes: {
    attached() {
      var prizes = this.data.wheelItems,
        len = prizes.length,
        rotateDeg = 360 / len / 2,
        html = [],
        turnNum = 1 / len

      prizes.forEach((prize, i) => {
        let item = {
          turn: (i * turnNum) + 'turn',
          lineTurn: i * turnNum + turnNum / 2 + 'turn'
        }
        prize = { ...prize, ...item }
        html.push(prize)
      })
      this.setData({wheelItems: html})
    },
  },
  methods: {
    play() {
      let page = getCurrentPages().pop()
      // here connects to backend to save the prize won
      this.spin();
    },
    spin() {
      var that = this
      var awardLen = that.data.wheelItems.length
      
      var awardIndex = Math.random() * awardLen >>> 0;
      var runNum = awardLen

      console.log('awardIndex', awardIndex)

      var runDegs = that.data.runDegs || 0
      console.log('deg', runDegs)
      runDegs = runDegs + (360 - runDegs % 360) + (360 * runNum - awardIndex * (360 / awardLen))
      console.log('deg', runDegs)
      that.setData({ runDegs })

      var animationRun = wx.createAnimation({
        duration: 4000,
        timingFunction: 'ease'
      })
      that.animationRun = animationRun
      animationRun.rotate(runDegs).step()
      that.setData({
        animationData: animationRun.export(),
        btnDisabled: true
      })

      // 中奖提示
      setTimeout(function () {
        // here will change to either popup or go to "woo hoo" page
        wx.showModal({
          title: 'You won...!',
          content: (that.data.wheelItems[awardIndex].item),
          showCancel: false
        })
        that.setData({
          btnDisabled: false
        })
      }, 4000);
    },
  }
})
