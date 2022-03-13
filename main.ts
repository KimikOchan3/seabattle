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
    if (f_menu == 1) {
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
input.onButtonPressed(Button.AB, function () {
    if (f_gamestart == 0) {
        random = randint(0, 3)
        randomfield(random)
        ships[random].showImage(0)
        f_gamestart = 1
    } else {
        f_menu += 1
        f_menu_page = 1
    }
})
input.onButtonPressed(Button.B, function () {
    if (f_menu == 1) {
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
let random = 0
let f_gamestart = 0
let f_menu_page = 0
let f_menu = 0
let field: number[] = []
let ships: Image[] = []
ships = [
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
    }
})
