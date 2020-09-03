//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    "wheel": [
      {
        "id": 6,
        "category": "food",
        "icon": "/images/Burger.svg",
        "color": "#00BFD3",
        "item": "Buy one cookie, get one free!"
      },
      {
        "id": 9,
        "category": "drink",
        "icon": "/images/Drink.svg",
        "color": "#F1AF2D",
        "item": "25% off of any House Cocktail!"
      },
      {
        "id": 3,
        "category": "skate",
        "icon": "/images/Skate.svg",
        "color": "#9B42A9",
        "item": "Skate FREE for 3 hours!"
      },
      {
        "id": 5,
        "category": "food",
        "icon": "/images/Burger.svg",
        "color": "#00BFD3",
        "item": "20% off ANY sweets or desserts!"
      },
      {
        "id": 8,
        "category": "drink",
        "icon": "/images/Drink.svg",
        "color": "#F1AF2D",
        "item": "Buy one get one special cocktail!"
      },
      {
        "id": 2,
        "category": "skate",
        "icon": "/images/Skate.svg",
        "color": "#9B42A9",
        "item": "Buy one get one pair of skates!"
      },
      {
        "id": 4,
        "category": "food",
        "icon": "/images/Burger.svg",
        "color": "#00BFD3",
        "item": "50% off ANY selection of RIINK Sliders!"
      },
      {
        "id": 7,
        "category": "drink",
        "icon": "/images/Drink.svg",
        "color": "#F1AF2D",
        "item": "1 FREE Beer or Wine of your choice!"
      },
      {
        "id": 1,
        "category": "skate",
        "icon": "/images/Skate.svg",
        "color": "#9B42A9",
        "item": "1 pair free skates!"
      },
      {
        "id": 10,
        "category": "mystery",
        "icon": "/images/mystery_box.png",
        "color": "#FFF",
        "item": "A special surprise gift from RIINK! Please present your redemption page at the counter to receive your special prize!"
      }
    ]
  },
  onLoad: function () {
    // wx.request url "/wheel"
  },
  drawCanvas() {
    // if canvas ever going to be needed again
    return new Promise((resolve, reject) => {
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
        // ctx.restore()

        // ctx.drawImage(colors[i]['icon'], 100, 20, 35, 35);
        // ctx.setLineWidth(1.0);
        // ctx.setStrokeStyle('#000');
        // ctx.stroke();

        ctx.restore()
        html.push({ turn: (i * turnNum) + 'turn', icon: colors[i].icon, item: colors[i].item, lineTurn: i * turnNum + turnNum / 2 + 'turn', color: colors[i].color});
        // html.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awardsConfig[i].name });
         
      }
      this.setData({ wheelItems: html })
      console.log(ctx)

      ctx.draw()
      resolve(ctx)
    })
  },
  getUserInfo: function(e) {
    
  }
})
