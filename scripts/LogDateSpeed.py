import csv
import datetime
import subprocess

print "Running Git Pull"

pullCmd = ['time','git','pull','--progress']
headCmd = ['git','rev-parse','HEAD']

res = subprocess.check_output(pullCmd, stderr=subprocess.STDOUT)

#Writing Output in File for Debugging
fp = open('PullOut.log','wb')
fp.write(res)
fp.close()

#Testing
#res = open('a.log', 'r').read()
###
    
print "Parsing Output"
dataLines = res.split('\n')

#print len(dataLines)
pullSize = "0 MiB"
#TODO:Check if always correct
try:
    finalObjectLine = dataLines[3]
    finalLineSplits = finalObjectLine.split('\r')

    s = finalLineSplits[-1]
    start = "Receiving objects:"
    end = "done."
    text = (s.split(start))[1].split(end)[0]
    start = ','
    end = '|'
    pullSize = (s.split(start))[1].split(end)[0]
except IndexError:
    pass

pullTimeLine = dataLines[-2].split(" ")
pullTimeIndex = dataLines[-2].split(" ").index("real")
pullTime = pullTimeLine[pullTimeIndex-1]
#print pullTime
print "Getting HEAD"
headLine = subprocess.check_output(headCmd, stderr=subprocess.STDOUT)
head = headLine.strip()

print "Appending to CSV File"

now = datetime.datetime.now()
currentTime = now.isoformat()
csvFileName = 'SpeedTimeLog.csv'

csvRow = currentTime,pullSize,pullTime,head

csvFile = open(csvFileName,'a')
wr = csv.writer(csvFile, quoting=csv.QUOTE_ALL)
wr.writerow(csvRow)
