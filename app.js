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
    this.num = 0
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
    let canMoveRight = parseFloat(this.right) + 10 - parseFloat(this.right) * 2
    let canMoveLeft = 360 - parseFloat(this.right)
    if (this.rgt < 0 && this.rgt >= canMoveRight) {
      this.moveRight("short")
      this.showAlert(
        `Square moved ${this.rgt / -50} unit to the <b>right</b>`,
        "success"
      )
    } else if (this.rgt > 0 && this.rgt <= canMoveLeft) {
      this.moveLeft("short")
      this.showAlert(
        `Square moved ${this.rgt / 50} unit to the <b>left</b>`,
        "success"
      )
    } else if (this.rgt > canMoveLeft || this.rgt < canMoveRight) {
      this.showAlert("You cant move out of the playground!", "danger")
    }
  }

  moveInY() {
    let canMoveUp = parseFloat(this.top) + 10 - parseFloat(this.top) * 2
    let canMoveDown = 360 - parseFloat(this.top)
    if (this.btm < 0 && this.btm >= canMoveUp) {
      this.moveUp("short")
      this.showAlert(
        `Square moved ${this.btm / -50} unit to the <b>up</b>`,
        "success"
      )
    } else if (this.btm > 0 && this.btm <= canMoveDown) {
      this.moveDown("short")
      this.showAlert(
        `Square moved ${this.btm / 50} unit to the <b>down</b>`,
        "success"
      )
    } else if (this.btm > canMoveDown || this.btm < canMoveUp) {
      this.showAlert("You cant move out of the playground!", "danger")
    }
  }

  runTheCodeShort() {
    this.placedMoves = document.querySelectorAll(".movePlace > .moveButton")
    let squ = document.getElementById("square")

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
    this.moveInX()
    this.moveInY()
    this.rgt = 0
    this.btm = 0
    squ.addEventListener("transitionend", () => {
      this.updatePos()
    })
    squ.addEventListener("webkitTransitionEnd", () => {
      this.updatePos()
    })
  }

  runTheCodeLong() {
    this.placedMoves = document.querySelectorAll(".movePlace > .moveButton")
    let squ = document.getElementById("square")

    setTimeout(() => {
      if (this.placedMoves[this.num].classList[1] == "up") {
        this.moveUp("long")
      } else if (this.placedMoves[this.num].classList[1] == "right") {
        this.moveRight("long")
      } else if (this.placedMoves[this.num].classList[1] == "down") {
        this.moveDown("long")
      } else if (this.placedMoves[this.num].classList[1] == "left") {
        this.moveLeft("long")
      }
      this.num++
      squ.addEventListener("transitionend", () => {
        this.updatePos()
      })
      squ.addEventListener("webkitTransitionEnd", () => {
        this.updatePos()
      })
      if (this.num < this.placedMoves.length) {
        this.runTheCodeLong()
      } else {
        this.num = 0
      }
    }, 1050)
  }

  updatePos() {
    this.top = $(`#${this.elementName}`).css("top")
    this.right = $(`#${this.elementName}`).css("right")
    this.all
    this.array = []
  }
}

let square = new Move("square")

function runShort() {
  square.runTheCodeShort()
}

function runLong() {
  square.runTheCodeLong()
}

function remove(element) {
  element.remove()
}

function clearLog(element) {
  let logs = document.querySelectorAll(".success, .danger")
  logs.forEach((log) => {
    log.remove()
  })
}

// Drag n Drop
const moves = document.querySelectorAll(".moveButton")
const places = document.querySelectorAll(".movePlace")
let selectedMove = null
let copyMove = null

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
}

//Drag Functions
function dragStart() {
  selectedMove = this
  copyMove = selectedMove.cloneNode(true)
  copyMove.classList.add("dragMove")
  setTimeout(() => {
    copyMove.classList.add("selectedMove")
    copyMove.classList.remove("dragMove")
  }, 0)
}

function dragEnd() {
  setTimeout(() => {
    selectedMove = null
    copyMove = null
  }, 0)
  copyMove.classList.add("noMargin", "moveButton")
  copyMove.classList.remove("selectedMove")
  copyMove.setAttribute("onclick", "remove(this)")
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
  this.append(copyMove)
}
