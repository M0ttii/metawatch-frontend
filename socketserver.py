import asyncio
import json

import websockets


CONNECTIONS = {}
METRICS = {}
metricspool = []
logpool = []
#JSON Format to send metrics/logs via socket
#Type can be "metrics" or "logs"
exampleMetric = '{"type":"metrics","message":"cpu changed"}'

async def handler(websocket):
    async for message in websocket:
        user_id = websocket.id
        CONNECTIONS[user_id] = websocket #Hier musst du deine eigene Logik implementieren wie du den User eindeutig identifizierst
        data = json.loads(message) #Converts string into json
        print(str(data))
        if "subscribe" in data: 
            subscribedType = data['subscribe']
            containerID = data['containerid']
            if subscribedType == "metrics":
                print("Metrics of container with ID " + containerID + " subscribed by Client with id " + str(websocket.id))
                if containerID in metricspool:
                    metricspool[containerID].append(websocket)
                else:
                    metricspool.append(containerID)
                    metricspool[containerID].append(websocket)
                await metricEvent(exampleMetric)
        if "unsubscribe" in data:
            unsubscribedType = data['unsubscribe']
            if unsubscribedType == "metrics":
                print("Metrics unsubscribed by Client with id " + str(websocket.id))
                metricspool.remove(websocket)


#Called when new metric arrives that has to be sent to the clients
async def metricEvent(metric):
    for websocket in metricspool:
        await websocket.send(metric)

async def main():
    async with websockets.serve(handler, "localhost", 8001):
        print("Server started")
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())