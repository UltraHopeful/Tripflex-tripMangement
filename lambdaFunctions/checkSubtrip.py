import json
# https://stackoverflow.com/questions/63278737/object-of-type-decimal-is-not-json-serializable
from decimal import Decimal
from time import sleep

import boto3
from boto3.dynamodb.conditions import Attr, Key


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


dynamoDb = boto3.resource("dynamodb")

targetDb = "trips"
targetDetailDb = "subTrip"

def lambda_handler(event, context):
    # TODO implement
    print(event)
    body = json.loads(event['body'])
    subTripId = body.get('subTripId')

    # subTripId = '6EUX20220720'
    try:
        subTripTable = dynamoDb.Table(targetDetailDb)
        rawData2 = subTripTable.get_item(
            Key={
                'subTripId':subTripId
            }
        )
        subTrip = rawData2['Item']
        print(subTrip)

        dataRows = {'subTrip':subTrip}
        print(dataRows)

        return {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials" : "true" 
            },
            'body': json.dumps(dataRows, cls=DecimalEncoder)
        }

    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials" : "true" 
            },
            'body': json.dumps('Internal server error')
        }