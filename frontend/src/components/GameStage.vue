<template>
    <div>
        <div id="game_body"></div>
    </div>
</template>

<script>
  import axios from 'axios'
  import * as PIXI from 'pixi.js'
  let pixiApp = null
  let containers = {
    fullView: null
  }
  let sprites = {
    horses: [],
    track: null,
    concrete: null,
    steel_fender: null,
    grass_fender: null,
    seat: null,
    seat_exit: null,
    seat_stair: null,
    road_decoration: null,
    track_floor: null,
    sign: null,
    audiences: [],
    waitingHorses: []
  }

  let state = function () {}

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  export default {
    name: "GameStage",
    props: {
      jwtToken: String
    },
    data() {
      return {
        engineIntv: 5000,
        highIntv: 1000,
        lowIntv: 5000,
        loaderEngine: null,
        distances: [],
        track_win: [],
        hasWinner: false
      }
    },
    methods: {
      loader() {
        axios.get(this.gameServer + '/status', {
          headers: {
            'Authorization': this.jwtToken
          }
        }).then((res)=>{
          let info = JSON.parse(JSON.stringify(res.data))
          console.log(info)
          if (parseInt(info.isGaming && this.engineIntv === this.lowIntv)) {
            for (let i = 0; i < sprites.waitingHorses.length; i++ ) {
              containers.fullView.removeChild(sprites.waitingHorses[i])
              containers.fullView.addChild(sprites.horses[i])
            }
            state = this.runState
            this.track_win = []
            this.hasWinner = false

            clearInterval(this.loaderEngine)
            this.engineIntv = this.highIntv
            this.loaderEngine = setInterval(this.loader, this.engineIntv)
          } else if (!parseInt(info.isGaming) && this.engineIntv === this.highIntv) {
            for (let i = 0; i < info.track_win.length; i++) {
              this.track_win.push(info.track_win[i])
            }
            this.hasWinner = true
            for (let i = 0; i < sprites.horses[i].length; i++ ) {
              sprites.waitingHorses[i].x = sprites.horses[i].x
              containers.fullView.removeChild(sprites.horses[i])
              containers.fullView.addChild(sprites.waitingHorses[i])
            }

            state = this.endingState

            clearInterval(this.loaderEngine)
            this.engineIntv = this.lowIntv
            this.loaderEngine = setInterval(this.loader, this.engineIntv)
          }
          for (let i = 0; i < info.distances.length; i++) {
            this.distances[i] = parseInt(info.distances[i])
          }
        })
      },
      cameraScroll() {
        let horsesX = []
        for (let i = 0; i < sprites.horses.length; i++) {
          horsesX.push(sprites.horses[i].x)
        }
        horsesX.sort((a, b)=>{return b-a})
        let highestX = horsesX[0]
        if (highestX >= (window.innerWidth - 150 - containers.fullView.x)) {
          containers.fullView.x -= highestX - (window.innerWidth - 150 - containers.fullView.x)
        }
      },
      horseRunRandomlyState() {
        for (let i = 0; i < sprites.horses.length; i++ ) {
          let fastOrSlow = randomInt(1, 2)
          let speedDiff = randomInt(1, 2) / 10
          if (fastOrSlow === 1) {
            sprites.horses[i].vx += speedDiff
            sprites.horses[i].x += sprites.horses[i].vx
          } else {
            if ((sprites.horses[i].vx - speedDiff) >= 0) {
              sprites.horses[i].vx -= speedDiff
              sprites.horses[i].x += sprites.horses[i].vx
            }
          }
        }
        this.cameraScroll()
        if (containers.fullView.x <= -2350 + window.innerWidth) {
          state = this.endingState
        }
      },
      runState() {
        for (let i = 0; i < sprites.horses.length; i++ ) {
          sprites.horses[i].x = this.distances[i] * (window.innerWidth + 150)/100
        }
        this.cameraScroll()
        // if (containers.fullView.x <= -2350 + window.innerWidth) {
        //   state = this.endingState
        // }
      },
      endingState() {
        setTimeout(()=>{
          let horseXOffset = 8
          let horsesToLeft = 20
          for (let i = 0; i < sprites.waitingHorses.length; i++ ) {
            sprites.waitingHorses[i].x = horsesToLeft + horseXOffset * sprites.waitingHorses.length - horseXOffset * (i-1)
          }
          state = this.waitingState
        }, 10000)
      },
      waitingState() {},
      gameLoop(delta) {
        state(delta)
      },
      gameLoadSetup() {
        // get a reference of spritesheet
        let sheet = PIXI.loader.resources["images/fastma_spritesheet.json"].spritesheet
        containers.fullView = new PIXI.Container()
        // load concrete floor
        for (let j = 0; j < 8; j++) {
          for (let i = 0; i <= 40; i++) {
            sprites.concrete = new PIXI.Sprite(sheet.textures['concrete.png'])
            sprites.concrete.x = sprites.concrete.width * i - 30*(j%2)
            sprites.concrete.y = - 15 + 15*j - j
            containers.fullView.addChild(sprites.concrete)
          }
        }
        // load steel fenders
        for (let i = 0; i <= 20; i++) {
          sprites.steel_fender = new PIXI.Sprite(sheet.textures['steel_fender_1.png'])
          sprites.steel_fender.y = 30
          sprites.steel_fender.x = sprites.steel_fender.width * i
          containers.fullView.addChild(sprites.steel_fender)
        }
        // load grass fenders
        for (let i = 0; i <= 15; i++) {
          sprites.steel_fender = new PIXI.Sprite(sheet.textures['grass_fender_1.png'])
          sprites.steel_fender.y = 37
          sprites.steel_fender.x = sprites.steel_fender.width * i + 100 * i
          containers.fullView.addChild(sprites.steel_fender)
        }
        // load seat / stair / exit
        let seatLoadPosition = 230
        for (let i = 0; i < 5; i++) {
          if (i === 0 || i === 4) {
            sprites.seat_stair = new PIXI.Sprite(sheet.textures['seat_stair.png'])
            sprites.seat_stair.x = seatLoadPosition
            sprites.seat_stair.y = -12
            containers.fullView.addChild(sprites.seat_stair)
            seatLoadPosition += sprites.seat_stair.width
          } else {
            sprites.seat = new PIXI.Sprite(sheet.textures['seat.png'])
            sprites.seat_exit = new PIXI.Sprite(sheet.textures['seat_exit.png'])

            sprites.seat.x = seatLoadPosition
            containers.fullView.addChild(sprites.seat)
            seatLoadPosition += sprites.seat.width

            sprites.seat_exit.x = seatLoadPosition
            containers.fullView.addChild(sprites.seat_exit)
            seatLoadPosition += sprites.seat_exit.width
          }
        }
        seatLoadPosition += 150
        for (let i = 0; i < 5; i++) {
          if (i === 0 || i === 4) {
            sprites.seat_stair = new PIXI.Sprite(sheet.textures['seat_stair.png'])
            sprites.seat_stair.x = seatLoadPosition
            containers.fullView.addChild(sprites.seat_stair)
            seatLoadPosition += sprites.seat_stair.width
          } else {
            sprites.seat = new PIXI.Sprite(sheet.textures['seat.png'])
            sprites.seat_exit = new PIXI.Sprite(sheet.textures['seat_exit.png'])

            sprites.seat.x = seatLoadPosition
            containers.fullView.addChild(sprites.seat)
            seatLoadPosition += sprites.seat.width

            sprites.seat_exit.x = seatLoadPosition
            containers.fullView.addChild(sprites.seat_exit)
            seatLoadPosition += sprites.seat_exit.width
          }
        }
        seatLoadPosition += 150
        for (let i = 0; i < 5; i++) {
          if (i === 0 || i === 4) {
            sprites.seat_stair = new PIXI.Sprite(sheet.textures['seat_stair.png'])
            sprites.seat_stair.x = seatLoadPosition
            containers.fullView.addChild(sprites.seat_stair)
            seatLoadPosition += sprites.seat_stair.width
          } else {
            sprites.seat = new PIXI.Sprite(sheet.textures['seat.png'])
            sprites.seat_exit = new PIXI.Sprite(sheet.textures['seat_exit.png'])

            sprites.seat.x = seatLoadPosition
            containers.fullView.addChild(sprites.seat)
            seatLoadPosition += sprites.seat.width

            sprites.seat_exit.x = seatLoadPosition
            containers.fullView.addChild(sprites.seat_exit)
            seatLoadPosition += sprites.seat_exit.width
          }
        }
        // load audiences
        for (let j = 0; j < 5; j++ ) {
          for (let i = 1; i <= 10; i++) {
            sprites.audiences.push(new PIXI.extras.AnimatedSprite(sheet.animations[`audience${i}`]))
          }
        }
        for (let i = 0; i < sprites.audiences.length; i++) {
          sprites.audiences[i].y = 55 + randomInt(0, 100)/100 * 10
          sprites.audiences[i].x = 200+ randomInt(0, 100)/100 * 2100
          sprites.audiences[i].animationSpeed = 0.1
          sprites.audiences[i].play()
          containers.fullView.addChild(sprites.audiences[i])
        }
        // load background 1st layer TOTAL WIDTH 2400
        for (let i = 0; i < 10; i++) {
          sprites.track = new PIXI.Sprite(sheet.textures['track.png'])
          sprites.track.y = 50
          sprites.track.x = sprites.track.width * i - i
          containers.fullView.addChild(sprites.track)
        }
        // load start decoration
        sprites.road_decoration = new PIXI.Sprite(sheet.textures['road_decoration.png'])
        sprites.road_decoration.x = 125
        sprites.road_decoration.y = 40
        containers.fullView.addChild(sprites.road_decoration)
        // load track floor
        for (let j = 0; j < 11; j++) {
          for (let i = 0; i <= 40; i++) {
            sprites.track_floor = new PIXI.Sprite(sheet.textures['track_floor.png'])
            sprites.track_floor.x = sprites.track_floor.width * i - 30*(j%2)
            sprites.track_floor.y = 174 + 15*j - j
            containers.fullView.addChild(sprites.track_floor)
          }
        }
        for (let j = 0; j < 22; j++) {
          for (let i = 0; i <= 40; i++) {
            sprites.track_floor = new PIXI.Sprite(sheet.textures['track_floor.png'])
            sprites.track_floor.x = sprites.track_floor.width * i - 30*(j%2) - 8*j
            sprites.track_floor.y = 174 + 15*j - j - 8*j
            containers.fullView.addChild(sprites.track_floor)
          }
        }
        // load animated horses
        let horseYOffset = 25
        let horseXOffset = 8
        let horsesToLeft = 20
        let horsesToTop = 120
        for (let j = 1; j <= 8; j++) {
          sprites.horses.push(new PIXI.extras.AnimatedSprite(sheet.animations[`horse${j}`]))
        }
        for (let i = 0; i < sprites.horses.length; i++) {
          sprites.horses[i].vx = 0
          sprites.horses[i].animationSpeed = 0.1
          sprites.horses[i].play()
          sprites.horses[i].x = horsesToLeft + horseXOffset * sprites.horses.length - horseXOffset * (i-1)
          sprites.horses[i].y = horsesToTop + horseYOffset * (i-1)
          // containers.fullView.addChild(sprites.horses[i])
        }
        // load waiting horses
        for (let j = 1; j <= 8; j++) {
          sprites.waitingHorses.push(new PIXI.Sprite(sheet.textures[`horse${j}_01.png`]))
        }
        for (let i = 0; i < sprites.waitingHorses.length; i++) {
          sprites.waitingHorses[i].vx = 0
          sprites.waitingHorses[i].x = horsesToLeft + horseXOffset * sprites.waitingHorses.length - horseXOffset * (i-1)
          sprites.waitingHorses[i].y = horsesToTop + horseYOffset * (i-1)
          containers.fullView.addChild(sprites.waitingHorses[i])
        }
        // load background 2nd layer TOTAL WIDTH 2400
        for (let i = 0; i < 10; i++) {
          sprites.track = new PIXI.Sprite(sheet.textures['track.png'])
          sprites.track.y = 280
          sprites.track.x = sprites.track.width * i - i
          containers.fullView.addChild(sprites.track)
        }
        // load track end stuff
        sprites.sign = new PIXI.Sprite(sheet.textures['sign.png'])
        sprites.road_decoration = new PIXI.Sprite(sheet.textures['road_decoration.png'])
        sprites.sign.y = 280
        sprites.sign.x = 2200
        containers.fullView.addChild(sprites.sign)
        sprites.road_decoration.y = 260
        sprites.road_decoration.x = 2240
        containers.fullView.addChild(sprites.road_decoration)
        // load everything to stage
        pixiApp.stage.addChild(containers.fullView)
        // start game loop
        pixiApp.ticker.add(delta => this.gameLoop(delta))
  
      },
    },
    mounted() {
      // PIXI application
      pixiApp = new PIXI.Application({
        width: window.innerWidth,
        // width: 2400,
        height: 365,
        antialias: false,
        transparent: false,
        resolution: 1
      })
      // pixiApp.renderer.view.style.position = "absolute"
      // pixiApp.renderer.view.style.display = "block"

      // load app to html
      document.getElementById('game_body').appendChild(pixiApp.view)
      // load textures
      PIXI.loader.add("images/fastma_spritesheet.json").load(this.gameLoadSetup)
      // start loader engine
      this.loaderEngine = setInterval(this.loader, this.engineIntv)
    }
  }
</script>

<style scoped>


</style>