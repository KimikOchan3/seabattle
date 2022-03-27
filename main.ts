function display_score () {
    basic.clearScreen()
    basic.showNumber(score)
    basic.pause(100)
    f_menu_page = 0
    Render()
}
function randomfield (fieldnum: number) {
    if (fieldnum == 0) {
        field = [
        1,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1
        ]
    } else if (fieldnum == 1) {
        field = [
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1
        ]
    } else if (fieldnum == 2) {
        field = [
        1,
        0,
        0,
        1,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        1,
        0,
        1
        ]
    } else if (fieldnum == 3) {
        field = [
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        1,
        1,
        1,
        0,
        1
        ]
    }
}
input.onButtonPressed(Button.A, function () {
    if (f_menu >= 1) {
        if (f_menu_page <= 1) {
            f_menu_page = 5
        } else if (f_menu_page == 2) {
            f_menu_page += -1
        } else if (f_menu_page == 3) {
            f_menu_page += -1
        } else if (f_menu_page == 4) {
            f_menu_page += -1
        } else if (f_menu_page >= 5) {
            f_menu_page += -1
        }
    } else if (f_menu_page > -1) {
        f_menu_page += -1
    }
    Render()
})
function Render () {
    if (f_gamestart == 1) {
        if (f_menu == 0) {
            if (f_menu_page == -1) {
                display_score()
            } else if (f_menu_page == 0) {
                mapDraw()
            } else if (f_menu_page == 1) {
                display_debris()
            }
        } else if (f_menu == 1) {
            if (f_menu_page == 1) {
                basic.showString("A")
            } else if (f_menu_page == 2) {
                basic.showString("B")
            } else if (f_menu_page == 3) {
                basic.showString("C")
            } else if (f_menu_page == 4) {
                basic.showString("D")
            } else if (f_menu_page == 5) {
                basic.showString("E")
            }
        } else if (f_menu == 2) {
            if (f_menu_page == 1) {
                basic.showString("1")
            } else if (f_menu_page == 2) {
                basic.showString("2")
            } else if (f_menu_page == 3) {
                basic.showString("3")
            } else if (f_menu_page == 4) {
                basic.showString("4")
            } else if (f_menu_page == 5) {
                basic.showString("5")
            }
        }
    }
}
function Shot (X: number, Y: number) {
    mapDraw()
    for (let index = 0; index < 6; index++) {
        led.toggle(X, Y)
        basic.pause(200)
    }
    if (field[X + Y * 5] == 1) {
        field[X + Y * 5] = 2
        radio.sendString("hit")
    } else if (field[X + Y * 5] == 0) {
        mp_IsMyTurn = 1
        radio.sendString("miss")
    }
    mapDraw()
}
input.onButtonPressed(Button.AB, function () {
    if (f_gamestart == 0) {
        random = randint(0, 3)
        randomfield(random)
        mapDraw()
        f_gamestart = 1
        mp_IsMyTurn = 1
        radio.sendString("battlestart")
    } else if (f_menu == 1) {
        attY = f_menu_page
        f_menu = 2
        f_menu_page = 1
    } else if (f_menu == 2) {
        attX = f_menu_page
        f_menu_page = 0
        f_menu = 0
        radio.sendValue("xshot", attX)
        radio.sendValue("yshot", attY)
        radio.sendString("shot")
        mapDraw()
    } else if (mp_IsMyTurn == 1) {
        f_menu = 1
        f_menu_page = 1
    }
    Render()
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "battlestart") {
        random = randint(0, 3)
        randomfield(random)
        mapDraw()
        f_gamestart = 1
    } else if (receivedString == "shot") {
        mapDraw()
        Shot(mp_bigshotX - 1, mp_bigshotY - 1)
    } else if (receivedString == "miss") {
        mp_IsMyTurn = 0
    } else if (receivedString == "hit") {
        debris[attX - 1 + (attY - 1) * 5] = 1
        score += 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (f_menu >= 1) {
        if (f_menu_page <= 1) {
            f_menu_page += 1
        } else if (f_menu_page == 2) {
            f_menu_page += 1
        } else if (f_menu_page == 3) {
            f_menu_page += 1
        } else if (f_menu_page == 4) {
            f_menu_page += 1
        } else if (f_menu_page >= 5) {
            f_menu_page = 1
        }
    } else if (f_menu_page < 1) {
        f_menu_page += 1
    }
    Render()
})
function mapDraw () {
    XDraw = 0
    YDraw = 0
    basic.clearScreen()
    for (let index = 0; index < 5; index++) {
        for (let index = 0; index < 5; index++) {
            if (field[XDraw + YDraw * 5] == 1) {
                led.plot(XDraw, YDraw)
            } else if (field[XDraw + YDraw * 5] == 2) {
                led.plotBrightness(XDraw, YDraw, 88)
            }
            YDraw += 1
        }
        YDraw = 0
        XDraw += 1
    }
    XDraw = 0
}
radio.onReceivedValue(function (name, value) {
    if (name == "xshot") {
        mp_bigshotX = value
    } else if (name == "yshot") {
        mp_bigshotY = value
    }
})
function display_debris () {
    XDraw = 0
    YDraw = 0
    basic.clearScreen()
    for (let index = 0; index < 5; index++) {
        for (let index = 0; index < 5; index++) {
            if (debris[XDraw + YDraw * 5] == 1) {
                led.plotBrightness(XDraw, YDraw, 88)
            }
            YDraw += 1
        }
        YDraw = 0
        XDraw += 1
    }
    attX = 0
}
let YDraw = 0
let XDraw = 0
let debris: number[] = []
let mp_bigshotY = 0
let mp_bigshotX = 0
let attX = 0
let attY = 0
let random = 0
let mp_IsMyTurn = 0
let f_gamestart = 0
let f_menu = 0
let field: number[] = []
let f_menu_page = 0
let score = 0
radio.setTransmitPower(7)
radio.setGroup(333)
radio.sendString("ping!")
score = 10
basic.clearScreen()
led.setDisplayMode(DisplayMode.Greyscale)
let ships = [
images.createImage(`
    # # # . #
    . . . . .
    # . # . #
    # . # . .
    . . . . #
    `),
images.createImage(`
    . . . . #
    # # # . .
    . . . . #
    # . # . .
    # . # . #
    `),
images.createImage(`
    # . . # #
    # . . . .
    . . # . #
    . . . . #
    # . # . #
    `),
images.createImage(`
    # . . # #
    . . . . .
    # # . . #
    . . . . .
    # # # . #
    `)
]
basic.forever(function () {
	
})
