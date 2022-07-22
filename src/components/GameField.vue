<template>
  <div id="container">
    <div v-for="y in field.length" :key="y" class="row">
      <div v-for="x in field[0].length" :key="x" class="tile">
        <img src="@/assets/square.png" v-if="current['pos' + current.curPos].some(n => n.x + movement.x === x && n.y + movement.y === y)" class="tileImg">
        <!--<img src="@/assets/squareLay.png" v-if="field[y][x]" class="tileImg"> -->
      </div>
    </div>
    <div class="overlay" v-if="false">
      <div>
        You paused the Game, press
        <br><br>
        <div style="font-weight: bolder; font-size: 30px">
          ESC
        </div>
        <br>
        to continue
      </div>
    </div>
    <div class="overlay" v-if="false">
      <div style="height: 40px">
        Press WASD to Start
      </div>
    </div>
  </div>
</template>

<script>
import {tShape} from '@/models/tShape'

// const blocks = [tShape]

export default {
  name: "GameField",
  data() {
    return {
      field: Array(16).fill().map(() => Array(10).fill(false)),
      current: new tShape(),
      movement: {x: 0, y: 0},
      paused: false,
      handle: null,
    }
  },

  methods: {
    gameLoop() {
      if(!this.paused) {
        this.handle = setTimeout(this.gameLoop, 700)
        this.moveDown()
      }
    },

    moveDown() {
      //const root = this
      const currentBlock = this.current['pos' + this.current.curPos]
      if(!this.current['pos' + this.current.curPos].some(n => n.y + this.movement.y > 15)) {
        this.movement.y++
      } else {
        currentBlock.forEach(n => {
          this.field[n.y + this.movement.y][n.x + this.movement.x] = true
        })

      }
    },

    fall() {

    }
  },

  mounted() {
    console.log(this.field[0][1])

    this.gameLoop()


    document.onkeydown = (event) => {
      if (event.key === 'w' || event.key === 'ArrowUp') {
        this.current.rotate(this.movement)

      } else if (event.key === 'a' || event.key === 'ArrowLeft') {
        if(!this.current['pos' + this.current.curPos].some(n => n.x + this.movement.x < 2)) {
        this.movement.x--
        }
      } else if (event.key === 'd' || event.key === 'ArrowRight') {
        if(!this.current['pos' + this.current.curPos].some(n => n.x + this.movement.x > 9)) {
          this.movement.x++
        }
      } else if (event.key === 's' || event.key === 'ArrowDown') {
        this.moveDown()
      } else if (event.key === 'Space') {
        this.fall()
      }
      /*
      else if (event.key === 'Escape') {
        this.paused = !this.paused
        if(!this.paused) {
          clearTimeout(this.handle)

          this.handle = setTimeout(this.gameLoop, 300)
        }
      }*/

    }

  }
}
</script>

<style scoped>
#container {
  width: 500px;
  height: 800px;
  border: 0.5px solid black;
  margin: 0 auto;
}

.tile {
  border: 0.5px solid black;
  width: 48.2px;
  height: 48.2px;
}

.row {
  display: flex;
}

.tileImg {
  max-width:100%;
  max-height:100%;
}

.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 200px;
  background-color: rgba(105, 105, 105, 0.8);
  transform: translate(-50%, -50%);
  color: white;
}


</style>