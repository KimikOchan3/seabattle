def display_score():
    global f_menu_page
    basic.clear_screen()
    basic.show_number(score)
    basic.pause(100)
    f_menu_page = 0
    Render()
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
    elif f_menu_page > -1:
        f_menu_page += -1
    Render()
input.on_button_pressed(Button.A, on_button_pressed_a)

def Render():
    if f_gamestart == 1:
        if f_menu == 0:
            if f_menu_page == -1:
                display_score()
            elif f_menu_page == 0:
                mapDraw()
            elif f_menu_page == 1:
                display_debris()
        elif f_menu == 1:
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
def Shot(X: number, Y: number):
    global mp_IsMyTurn
    mapDraw()
    for index in range(6):
        led.toggle(X, Y)
        basic.pause(200)
    if field[X + Y * 5] == 1:
        field[X + Y * 5] = 2
        radio.send_string("hit")
    elif field[X + Y * 5] == 0:
        mp_IsMyTurn = 1
        radio.send_string("miss")
    mapDraw()

def on_button_pressed_ab():
    global random, f_gamestart, mp_IsMyTurn, attY, f_menu, f_menu_page, attX
    if f_gamestart == 0:
        random = randint(0, 3)
        randomfield(random)
        mapDraw()
        f_gamestart = 1
        mp_IsMyTurn = 1
        radio.send_string("battlestart")
    elif f_menu == 1:
        attY = f_menu_page
        f_menu = 2
        f_menu_page = 1
    elif f_menu == 2:
        attX = f_menu_page
        f_menu_page = 0
        f_menu = 0
        radio.send_value("xshot", attX)
        radio.send_value("yshot", attY)
        radio.send_string("shot")
        mapDraw()
    elif mp_IsMyTurn == 1:
        f_menu = 1
        f_menu_page = 1
    Render()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global random, f_gamestart, mp_IsMyTurn, score
    if receivedString == "battlestart":
        random = randint(0, 3)
        randomfield(random)
        mapDraw()
        f_gamestart = 1
    elif receivedString == "shot":
        mapDraw()
        Shot(mp_bigshotX - 1, mp_bigshotY - 1)
    elif receivedString == "miss":
        mp_IsMyTurn = 0
    elif receivedString == "hit":
        debris[attX - 1 + (attY - 1) * 5] = 1
        score += 1
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
    elif f_menu_page < 1:
        f_menu_page += 1
    Render()
input.on_button_pressed(Button.B, on_button_pressed_b)

def mapDraw():
    global XDraw, YDraw
    XDraw = 0
    YDraw = 0
    basic.clear_screen()
    for index2 in range(5):
        for index3 in range(5):
            if field[XDraw + YDraw * 5] == 1:
                led.plot(XDraw, YDraw)
            elif field[XDraw + YDraw * 5] == 2:
                led.plot_brightness(XDraw, YDraw, 88)
            YDraw += 1
        YDraw = 0
        XDraw += 1
    XDraw = 0

def on_received_value(name, value):
    global mp_bigshotX, mp_bigshotY
    if name == "xshot":
        mp_bigshotX = value
    elif name == "yshot":
        mp_bigshotY = value
radio.on_received_value(on_received_value)

def display_debris():
    global XDraw, YDraw, attX
    XDraw = 0
    YDraw = 0
    basic.clear_screen()
    for index4 in range(5):
        for index5 in range(5):
            if debris[XDraw + YDraw * 5] == 1:
                led.plot_brightness(XDraw, YDraw, 88)
            YDraw += 1
        YDraw = 0
        XDraw += 1
    attX = 0
YDraw = 0
XDraw = 0
debris: List[number] = []
mp_bigshotY = 0
mp_bigshotX = 0
attX = 0
attY = 0
random = 0
mp_IsMyTurn = 0
f_gamestart = 0
f_menu = 0
field: List[number] = []
f_menu_page = 0
score = 0
radio.set_transmit_power(7)
radio.set_group(333)
radio.send_string("ping!")
score = 10
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

def on_forever():
    pass
basic.forever(on_forever)
