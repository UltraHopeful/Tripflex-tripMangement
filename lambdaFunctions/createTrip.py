import json
import boto3
import random
import string

def lambda_handler(event, context):
    
    print(event.get('body'))
    body = json.loads(event['body'])
    
    tripDetails = body['trip']
    
    subTripDetails = body['subTrip']
    
    s3DynamoDb = boto3.resource("dynamodb")
    targetTable = "trips"
    targetTable2 = "subTrip"
    
    tripTable = s3DynamoDb.Table(targetTable)
    subTripTable = s3DynamoDb.Table(targetTable2)
    # generate Random id for trip
    letters = string.digits + string.ascii_uppercase
    tripId = ''.join(random.choice(letters) for i in range(4))
    print (tripId)
    tripDetails['tripId'] = tripId
    print(tripDetails)
    tripTable.put_item(
      Item=tripDetails
    )
    print(len(subTripDetails))
    for eachSubTrip in subTripDetails:
        print(eachSubTrip['date'])
        subtripId = tripId + eachSubTrip['date'].replace("-","")
        print(subtripId)
        subTripTable.put_item(
          Item={
              "subTripId":subtripId,
              "tripId":tripId,
              "date":eachSubTrip['date'],
              "totalCapacity":eachSubTrip['totalCapcity'],
              "availableCapacity":eachSubTrip['totalCapcity']
          }
        )
    
    # tripDetails
    
    
    return {
        'statusCode': 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials" : "true" 
        },
        'body': json.dumps('Trip added successfully!')
    }
