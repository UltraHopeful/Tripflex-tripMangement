import json
import boto3
from botocore.exceptions import ClientError

class DecimalEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, Decimal):
      return str(obj)
    return json.JSONEncoder.default(self, obj)


def lambda_handler(event, context):
    print(event)
    print(event.get('body'))
    body = json.loads(event['body'])
    print(body)
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
        
    topic = topicArn
    protocol = "email"
    endpoint = body['email']
    # endpoint = "sohupatel8828@gmail.com"
    try:
        subscription = snsClient.subscribe(
            TopicArn=topic,
            Protocol=protocol,
            Endpoint=endpoint,
            ReturnSubscriptionArn=True)['SubscriptionArn']
        print(subscription)
        # cite : https://docs.aws.amazon.com/sns/latest/dg/message-filtering-apply.html
        subscriptionAttr = snsClient.set_subscription_attributes(
            SubscriptionArn=subscription,
            AttributeName='FilterPolicy',
            AttributeValue='{ \"email\": [ \"' + endpoint + '\" ] }'
        )
        print(subscriptionAttr)
        return {
            'statusCode': 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials" : "true" 
            },
            'body': json.dumps(subscriptionAttr, cls=DecimalEncoder)
        }
    except Exception as e:
        print(e)

