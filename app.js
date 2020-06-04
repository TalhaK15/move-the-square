class Move {
  constructor(elementName) {
    this.elementName = elementName
    this.top = $(`#${this.elementName}`).css("top")
    this.right = $(`#${this.elementName}`).css("right")
    this.all
    this.rgt = 0
    this.btm = 0
    this.placedMoves
    this.array = []
  }

  makeNumber() {
    this.array = [this.top, this.right]
    this.all = this.array
      .join("px")
      .split("px")
      .filter((arr) => arr != "")
      .map((i) => parseInt(i))
  }

  moveRight(type) {
    this.makeNumber()
    if (type == "short") {
      this.all[1] = parseFloat(this.all[1]) + this.rgt
      this.all = (this.all.join("px ") + "px").split(" ")
      $(`#${this.elementName}`).css("right", this.all[1])
    } else if (type == "long") {
      if (this.all[1] > 50) {
        this.all[1] = parseFloat(this.all[1]) - 50
        this.all = (this.all.join("px ") + "px").split(" ")
        $(`#${this.elementName}`).css("right", this.all[1])
        this.showAlert("Square has moved to <b>right</b>", "success")
      } else this.showAlert("You can't move out of the box!", "danger")
    }
  }

  moveLeft(type) {
    this.makeNumber()
    if (type == "short") {
      this.all[1] = parseFloat(this.all[1]) + this.rgt
      this.all = (this.all.join("px ") + "px").split(" ")
      $(`#${this.elementName}`).css("right", this.all[1])
    } else if (type == "long") {
      if (this.all[1] < 350) {
        this.all[1] = parseFloat(this.all[1]) + 50
        this.all = (this.all.join("px ") + "px").split(" ")
        $(`#${this.elementName}`).css("right", this.all[1])
        this.showAlert("Square has moved to <b>left</b>", "success")
      } else this.showAlert("You can't move out of the box!", "danger")
    }
  }

  moveUp(type) {
    this.makeNumber()
    if (type == "short") {
      this.all[0] = parseFloat(this.all[0]) + this.btm
      this.all = this.all.join("px ").split(" ")
      $(`#${this.elementName}`).css("top", this.all[0])
    } else if (type == "long") {
      if (this.all[0] > 50) {
        this.all[0] = parseFloat(this.all[0]) - 50
        this.all = this.all.join("px ").split(" ")
        $(`#${this.elementName}`).css("top", this.all[0])
        this.showAlert("Square has moved to <b>up</b>", "success")
      } else this.showAlert("You can't move out of the box!", "danger")
    }
  }

  moveDown(type) {
    this.makeNumber()
    if (type == "short") {
      this.all[0] = parseFloat(this.all[0]) + this.btm
      this.all = this.all.join("px ").split(" ")
      $(`#${this.elementName}`).css("top", this.all[0])
    } else if (type == "long") {
      if (this.all[0] < 350) {
        this.all[0] = parseFloat(this.all[0]) + 50
        this.all = this.all.join("px ").split(" ")
        $(`#${this.elementName}`).css("top", this.all[0])
        this.showAlert("Square has moved to <b>down</b>", "success")
      } else this.showAlert("You can't move out of the box!", "danger")
    }
  }

  showAlert(message, className) {
    var alert = `
            <div class="${className}">
                ${message}
            </div>
        `

    var logDiv = document.querySelector(".log")

    logDiv.innerHTML += alert
  }

  moveInX() {
    if (this.rgt < 0 && this.rgt >= -150) {
      this.moveRight("short")
      this.showAlert(
        `Square moved ${this.rgt / -50} unit to the <b>right</b>`,
        "success"
      )
    } else if (this.rgt > 0 && this.rgt <= 200) {
      this.moveLeft("short")
      this.showAlert(
        `Square moved ${this.rgt / 50} unit to the <b>left</b>`,
        "success"
      )
    } else if (this.rgt > 200 || this.rgt < -150) {
      this.showAlert("You cant move out of the playground!", "danger")
    }
  }

  moveInY() {
    if (this.btm < 0 && this.btm >= -150) {
      this.moveUp("short")
      this.showAlert(
        `Square moved ${this.btm / -50} unit to the <b>up</b>`,
        "success"
      )
    } else if (this.btm > 0 && this.btm <= 200) {
      this.moveDown("short")
      this.showAlert(
        `Square moved ${this.btm / 50} unit to the <b>down</b>`,
        "success"
      )
    } else if (this.btm > 200 || this.btm < -150) {
      this.showAlert("You cant move out of the playground!", "danger")
    }
  }

  runTheCode(type) {
    this.placedMoves = document.querySelectorAll(".movePlace > .moveButton")
    if (type == "short") {
      console.log("short")
      for (let placedMove of this.placedMoves) {
        if (placedMove.classList[1] == "up") {
          this.btm--
        } else if (placedMove.classList[1] == "right") {
          this.rgt--
        } else if (placedMove.classList[1] == "down") {
          this.btm++
        } else if (placedMove.classList[1] == "left") {
          this.rgt++
        }
      }
      this.rgt *= 50
      this.btm *= 50
      console.log(this.rgt, this.btm)
      this.moveInX()
      this.moveInY()
      this.updatePos()
    } else if (type == "long") {
      console.log("long")
      for (let placedMove of this.placedMoves) {
        if (placedMove.classList[1] == "up") {
          this.moveUp("long")
          this.updatePos()
        } else if (placedMove.classList[1] == "right") {
          this.moveRight("long")
          this.updatePos()
        } else if (placedMove.classList[1] == "down") {
          this.moveDown("long")
          this.updatePos()
        } else if (placedMove.classList[1] == "left") {
          this.moveLeft("long")
          this.updatePos()
        }
      }
    }
  }

  clearLog() {}

  updatePos() {
    this.top = $(`#${this.elementName}`).css("top")
    this.right = $(`#${this.elementName}`).css("right")
    this.all
    this.rgt = 0
    this.btm = 0
    this.array = []
  }
}

let square = new Move("square")
let runButtonShort = document.querySelector(".runShort")
let runButtonLong = document.querySelector(".runLong")

function runShort() {
  square.runTheCode("short")
}

function runLong() {
  square.runTheCode("long")
}

/* $(document).ready(function () {
  $(".run").click(function () {
    square.runTheCode()
    square = new Move("square")
  })
  $(".right").click(function () {
    a.moveRight()
    a = new Move("square")
  })
  $(".left").click(function () {
    a.moveLeft()
    a = new Move("square")
  })
  $(".up").click(function () {
    a.moveUp()
    a = new Move("square")
  })
  $(".down").click(function () {
    a.moveDown()
    a = new Move("square")
  })
}) */

// Drag n Drop
const moves = document.querySelectorAll(".moveButton")
const places = document.querySelectorAll(".movePlace")
const homes = document.querySelectorAll(".moveHome")
let selectedMove = null

//Loop Through Move Buttons
for (let move of moves) {
  move.addEventListener("dragstart", dragStart)
  move.addEventListener("dragend", dragEnd)

  //Loop Through Places
  for (let place of places) {
    place.addEventListener("dragenter", dragEnter)
    place.addEventListener("dragover", dragOver)
    place.addEventListener("dragleave", dragLeave)
    place.addEventListener("drop", dragDrop)
  }
  //Loop Through Homes
  for (let home of homes) {
    home.addEventListener("dragenter", dragEnterH)
    home.addEventListener("dragover", dragOverH)
    home.addEventListener("dragleave", dragLeaveH)
    home.addEventListener("drop", dragDropH)
  }
}

//Drag Functions
function dragStart() {
  selectedMove = this
  this.classList.add("dragMove")
  setTimeout(() => {
    this.classList.add("selectedMove")
    this.classList.remove("dragMove")
  }, 0)
}

function dragEnd() {
  setTimeout(() => (selectedMove = null), 0)
  this.classList.add("noMargin", "moveButton")
  this.classList.remove("selectedMove")
}

function dragOver(e) {
  e.preventDefault()
}

function dragEnter(e) {
  e.preventDefault()
  this.classList.add("hovered")
}

function dragLeave() {
  this.classList.remove("hovered")
}

function dragDrop() {
  this.classList.remove("hovered")
  this.append(selectedMove)
}
//---------------------------------------
function dragOverH(e) {
  e.preventDefault()
}

function dragEnterH(e) {
  e.preventDefault()
}

function dragLeaveH() {}

function dragDropH() {
  this.append(selectedMove)
}
