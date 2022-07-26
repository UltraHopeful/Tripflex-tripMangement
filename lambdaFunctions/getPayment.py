import json
import boto3
from decimal import Decimal

class DecimalEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, Decimal):
      return str(obj)
    return json.JSONEncoder.default(self, obj)

def lambda_handler(event, context):
    # TODO implement
    
    s3DynamoDb = boto3.resource("dynamodb")

    try:
        targetDb = "payment"

        table = s3DynamoDb.Table(targetDb)
    
        counter = 0
    
        rawData = table.scan()
        dataRows = {'payment':tuple(rawData['Items'])}
    
        # print(dataRows)
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
