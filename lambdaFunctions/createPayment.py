import json
import random
import string
from datetime import datetime
import boto3


def lambda_handler(event, context):
    print(event)
    print(event.get('body'))
    body = json.loads(event['body'])
    print(body)
    dynamoDbClient = boto3.resource("dynamodb")
    snsClient = boto3.client('sns')
    
    response = snsClient.list_topics()
    print(response)
    responseJson = response.get('Topics')
    topicArn = ""
    for topic in responseJson:
        topicArn = topic.get('TopicArn')
        if "tripConfirm" in topicArn:
            print(topicArn)
            break
    
    paymentDetails = body['paymentDetails']
    
    subTripId = paymentDetails['subTripId']
    noOfPersonInTrip = paymentDetails["noOfPersonInTrip"]

    subTripTable = dynamoDbClient.Table("subTrip")
    targetSubTrip = subTripTable.get_item(
        Key={
            'subTripId':subTripId
        }
    )
    
    topic = topicArn
    protocol = "email"
    endpoint = paymentDetails['email']

    subTrip = targetSubTrip['Item']
    print(subTrip)
    availableCapacity = subTrip.get("availableCapacity")
    print(type(subTrip.get("availableCapacity")))
    newCapacity = int(availableCapacity) - noOfPersonInTrip
    
    if(newCapacity >= 0):
        newCapacity = str(newCapacity)
        subTripTable.update_item(
            Key={"subTripId": subTripId},
            ExpressionAttributeValues={":val1": newCapacity},
            UpdateExpression="SET availableCapacity = :val1",
            ReturnValues="UPDATED_NEW",
        )

        paymentTable = dynamoDbClient.Table("payment")
        # generate Random id for trip
        letters = string.digits + string.ascii_uppercase
        paymentId = ''.join(random.choice(letters) for i in range(10))
        print (paymentId)
        print(datetime.today().strftime('%Y-%m-%d'))
        paymentDetails['paymentId'] = paymentId
        paymentDetails['paymentDate'] = datetime.today().strftime('%Y-%m-%d')
        paymentDetails['orderStatus'] = 'confirmed'
        print(paymentDetails)
        paymentTable.put_item(
        Item=paymentDetails
        )
        targetEmail = paymentDetails['email']
        mailMsg = f"You successfully booked {paymentDetails['tripName']} trip for {paymentDetails['noOfPersonInTrip']} persons \n on trip date {paymentDetails['date']}.\n The total bill amount is CA$ {paymentDetails['totalAmount']}.\nHere is the booking id for your reference : {paymentDetails['paymentId']}"
        response = snsClient.publish(
            TopicArn=topic,
            Message=mailMsg,
            Subject='Trip Booking Successful',
            MessageStructure='string',
            MessageAttributes={
                'email': {
                    'DataType': 'String',
                    'StringValue': targetEmail
                }
            }
        )
        print(response)
        
        return {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials" : "true" 
            },
            'body': json.dumps('Payment successful and trip booked!')
        }
    else:
        return {
            'statusCode': 202,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials" : "true" 
            },
            'body': json.dumps('Bookings not available.')
        }


