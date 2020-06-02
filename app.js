class Move {
  constructor(elementName) {
    this.elementName = elementName
    this.top = $(`#${elementName}`).css("top")
    this.right = $(`#${elementName}`).css("right")
    this.all
  }

  makeNumber() {
    let array = [this.top, this.right]
    this.all = array
      .join("px")
      .split("px")
      .filter((arr) => arr != "")
      .map((i) => parseInt(i))
  }

  moveRight() {
    this.makeNumber()
    if (this.all[1] > 50) {
      this.all[1] = parseFloat(this.all[1]) - 50
      this.all = (this.all.join("px ") + "px").split(" ")
      $(`#${this.elementName}`).css("right", this.all[1])
      this.showAlert("Square has moved to <b>right</b>", "success")
    } else this.showAlert("You can't move out of the box!", "danger")
  }

  moveLeft() {
    this.makeNumber()
    if (this.all[1] < 350) {
      this.all[1] = parseFloat(this.all[1]) + 50
      this.all = (this.all.join("px ") + "px").split(" ")
      $(`#${this.elementName}`).css("right", this.all[1])
      this.showAlert("Square has moved to <b>left</b>", "success")
    } else this.showAlert("You can't move out of the box!", "danger")
  }

  moveUp() {
    this.makeNumber()
    if (this.all[0] > 50) {
      this.all[0] = parseFloat(this.all[0]) - 50
      this.all = this.all.join("px ").split(" ")
      $(`#${this.elementName}`).css("top", this.all[0])
      this.showAlert("Square has moved to <b>up</b>", "success")
    } else this.showAlert("You can't move out of the box!", "danger")
  }

  moveDown() {
    this.makeNumber()
    if (this.all[0] < 350) {
      this.all[0] = parseFloat(this.all[0]) + 50
      this.all = this.all.join("px ").split(" ")
      $(`#${this.elementName}`).css("top", this.all[0])
      this.showAlert("Square has moved to <b>down</b>", "success")
    } else this.showAlert("You can't move out of the box!", "danger")
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
}

let a = new Move("square")

$(document).ready(function () {
  $("#right").click(function () {
    a.moveRight()
    a = new Move("square")
  })
  $("#left").click(function () {
    a.moveLeft()
    a = new Move("square")
  })
  $("#top").click(function () {
    a.moveUp()
    a = new Move("square")
  })
  $("#bottom").click(function () {
    a.moveDown()
    a = new Move("square")
  })
})
