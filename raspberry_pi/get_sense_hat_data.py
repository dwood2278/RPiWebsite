#!/usr/bin/python3
import os
import json
from sense_hat import SenseHat

def get_cpu_temp():
    temp = os.popen("vcgencmd measure_temp").readline()
    return float((temp.replace("temp=","")).replace("'C",""))

sense = SenseHat()

#Fetch Sensor Data
sense_hat_dict = {
    "pressure": sense.get_pressure(),
    "temperature": sense.get_temperature(),
    "temperatureFromPressure": sense.get_temperature_from_pressure(),
    "humidity": sense.get_humidity(),
    "pitch": sense.get_orientation()["pitch"],
    "roll": sense.get_orientation()["roll"],
    "yaw": sense.get_orientation()["yaw"],
    "cpuTemp": get_cpu_temp()
}

#Output data
print (json.dumps(sense_hat_dict))
