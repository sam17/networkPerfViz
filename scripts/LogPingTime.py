import pyping
import csv
import datetime

TataISPGateway = '111.93.187.85'
AirtelISPGateway = '182.75.130.145'
Wifi = '10.91.0.9'

response_tata = pyping.ping(TataISPGateway)
response_airtel = pyping.ping(AirtelISPGateway)
response_wifi = pyping.ping(Wifi)

if(response_tata.ret_code==0):
    tata_time = response_tata.avg_rtt
else:
    tata_time = -1.0

if(response_airtel.ret_code==0):
    airtel_time = response_airtel.avg_rtt
else:
    airtel_time = -1.0

if(response_wifi.ret_code==0):
    wifi_time = response_wifi.avg_rtt
else:
    wifi_time = -1.0


now = datetime.datetime.now()
currentTime = now.isoformat()
#print response_tata.avg_rtt,response_airtel.avg_rtt

csvFileName = '../netSpeed/PingTimeLog.csv'
csvRow = currentTime,tata_time,airtel_time,wifi_time
csvFile = open(csvFileName,'a')
wr = csv.writer(csvFile,quoting=csv.QUOTE_ALL)
wr.writerow(csvRow)
