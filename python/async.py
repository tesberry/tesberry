#!/usr/bin/env python

import asyncio
import can

# os.system('sudo ip link set can0 type can bitrate 500000')
# os.system('sudo ifconfig can0 up')

counter = 1

def print_message(msg: can.Message):
    '''Regular callback function. Can also be a coroutine.'''
    global counter
    print(counter)
    counter += 1

bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=500000)

async def main():
    '''The main function that runs in the loop.'''

    with can.Bus(interface='socketcan', channel='vcan0') as bus:
        reader = can.AsyncBufferedReader()

        listeners = [
            print_message,  # Callback function
            reader,  # AsyncBufferedReader() listener
        ]
        # Create Notifier with an explicit loop to use for scheduling of callbacks

        loop = asyncio.get_running_loop()
        notifier = can.Notifier(bus, listeners, loop=loop)

        try:
            while True:
                # Wait for next message from AsyncBufferedReader
                await reader.get_message()

        except KeyboardInterrupt:
            print('Closing Loop')
            notifier.stop()
            pass

asyncio.run(main())


# def closeConnection:
#     os.system('sudo ifconfig can0 down')
#     print('Connection closed.')
# atexit.register(closeConnection)
