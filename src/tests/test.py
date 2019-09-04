
count = 0


def on_open():
    global count
    if count % 10 == 0:
        print("heheda")
    count = count + 1


on_open()
on_open()
on_open()
