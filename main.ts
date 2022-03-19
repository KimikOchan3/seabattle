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
    }
})
function Shot (X: number, Y: number) {
    mapDraw()
    for (let index = 0; index < 6; index++) {
        led.toggle(X, Y)
        basic.pause(200)
    }
    if (field[X + Y * 5] == 1) {
        field[X + Y * 5] = 2
    } else if (field[X + Y * 5] == 0) {
    	
    }
    mapDraw()
}
input.onButtonPressed(Button.AB, function () {
    if (f_gamestart == 0) {
        random = randint(0, 3)
        randomfield(random)
        mapDraw()
        f_gamestart = 1
        radio.sendString("sea.battlestart")
        mp_IsMyTurn = 1
    } else {
        if (f_menu == 1) {
            attY = f_menu_page
            f_menu = 2
            f_menu_page = 1
        } else if (f_menu == 2) {
            attX = f_menu_page
            f_menu = 0
            Shot(attX - 1, attY - 1)
            mapDraw()
            radio.sendValue("sea.xshot", attX)
            radio.sendValue("sea.yshot", attY)
            radio.sendString("sea.shot")
        } else {
            if (mp_IsMyTurn == 1) {
                f_menu = 1
                f_menu_page = 1
            }
        }
    }
})
radio.onReceivedString(function (receivedString) {
    random = randint(0, 3)
    randomfield(random)
    mapDraw()
    f_gamestart = 1
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
    }
})
function mapDraw () {
    attX = 0
    attY = 0
    for (let index = 0; index < 5; index++) {
        for (let index = 0; index < 5; index++) {
            if (field[attX + attY * 5] == 1) {
                led.plot(attX, attY)
            } else if (field[attX + attY * 5] == 0) {
                led.unplot(attX, attY)
            } else if (field[attX + attY * 5] == 2) {
                led.plotBrightness(attX, attY, 88)
            }
            attY += 1
        }
        attY = 0
        attX += 1
    }
    attX = 0
}
let attX = 0
let attY = 0
let mp_IsMyTurn = 0
let random = 0
let f_gamestart = 0
let f_menu_page = 0
let f_menu = 0
let field: number[] = []
radio.setGroup(333)
radio.sendString("ping!")
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
field = [
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0
]
basic.forever(function () {
    if (f_gamestart == 1) {
        if (f_menu == 1) {
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
        } else {
        	
        }
    }
})
