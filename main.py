def randomfield(fieldnum: number):
    global field
    if fieldnum == 0:
        field = [1,
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
            1]
    elif fieldnum == 1:
        field = [0,
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
            1]
    elif fieldnum == 2:
        field = [1,
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
            1]
    elif fieldnum == 3:
        field = [1,
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
            1]

def on_button_pressed_a():
    global f_menu_page
    if f_menu >= 1:
        if f_menu_page <= 1:
            f_menu_page = 5
        elif f_menu_page == 2:
            f_menu_page += -1
        elif f_menu_page == 3:
            f_menu_page += -1
        elif f_menu_page == 4:
            f_menu_page += -1
        elif f_menu_page >= 5:
            f_menu_page += -1
input.on_button_pressed(Button.A, on_button_pressed_a)

def Shot(X: number, Y: number):
    mapDraw()
    for index in range(6):
        led.toggle(X, Y)
        basic.pause(200)
    if field[X + Y * 5] == 1:
        field[X + Y * 5] = 2
    elif field[X + Y * 5] == 0:
        pass
    mapDraw()

def on_button_pressed_ab():
    global random, f_gamestart, mp_IsMyTurn, attY, f_menu, f_menu_page, attX
    if f_gamestart == 0:
        random = randint(0, 3)
        randomfield(random)
        mapDraw()
        f_gamestart = 1
        radio.send_string("sea.battlestart")
        mp_IsMyTurn = 1
    else:
        if f_menu == 1:
            attY = f_menu_page
            f_menu = 2
            f_menu_page = 1
        elif f_menu == 2:
            attX = f_menu_page
            f_menu = 0
            Shot(attX - 1, attY - 1)
            mapDraw()
            radio.send_value("sea.xshot", attX)
            radio.send_value("sea.yshot", attY)
            radio.send_string("sea.shot")
        else:
            if mp_IsMyTurn == 1:
                f_menu = 1
                f_menu_page = 1
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global random, f_gamestart
    if receivedString == "sea.battlestart":
        random = randint(0, 3)
        randomfield(random)
        mapDraw()
        f_gamestart = 1
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    global f_menu_page
    if f_menu >= 1:
        if f_menu_page <= 1:
            f_menu_page += 1
        elif f_menu_page == 2:
            f_menu_page += 1
        elif f_menu_page == 3:
            f_menu_page += 1
        elif f_menu_page == 4:
            f_menu_page += 1
        elif f_menu_page >= 5:
            f_menu_page = 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def mapDraw():
    global attX, attY
    attX = 0
    attY = 0
    for index2 in range(5):
        for index3 in range(5):
            if field[attX + attY * 5] == 1:
                led.plot(attX, attY)
            elif field[attX + attY * 5] == 0:
                led.unplot(attX, attY)
            elif field[attX + attY * 5] == 2:
                led.plot_brightness(attX, attY, 88)
            attY += 1
        attY = 0
        attX += 1
    attX = 0

def on_received_value(name, value):
    if name == "sea.battlestart":
        pass
radio.on_received_value(on_received_value)

attX = 0
attY = 0
mp_IsMyTurn = 0
random = 0
f_gamestart = 0
f_menu_page = 0
f_menu = 0
field: List[number] = []
radio.set_group(333)
radio.send_string("ping!")
basic.clear_screen()
led.set_display_mode(DisplayMode.GREYSCALE)
ships = [images.create_image("""
        # # # . #
            . . . . .
            # . # . #
            # . # . .
            . . . . #
    """),
    images.create_image("""
        . . . . #
            # # # . .
            . . . . #
            # . # . .
            # . # . #
    """),
    images.create_image("""
        # . . # #
            # . . . .
            . . # . #
            . . . . #
            # . # . #
    """),
    images.create_image("""
        # . . # #
            . . . . .
            # # . . #
            . . . . .
            # # # . #
    """)]
field = [0,
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
    0]

def on_forever():
    if f_gamestart == 1:
        if f_menu == 1:
            if f_menu_page == 1:
                basic.show_string("A")
            elif f_menu_page == 2:
                basic.show_string("B")
            elif f_menu_page == 3:
                basic.show_string("C")
            elif f_menu_page == 4:
                basic.show_string("D")
            elif f_menu_page == 5:
                basic.show_string("E")
        elif f_menu == 2:
            if f_menu_page == 1:
                basic.show_string("1")
            elif f_menu_page == 2:
                basic.show_string("2")
            elif f_menu_page == 3:
                basic.show_string("3")
            elif f_menu_page == 4:
                basic.show_string("4")
            elif f_menu_page == 5:
                basic.show_string("5")
        else:
            pass
basic.forever(on_forever)
