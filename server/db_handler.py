import json
import base64
import boto3
from boto3.dynamodb.conditions import Key

# save analysis results into DynamoDB
def put_items_to_db(result):
    from datetime import datetime
    dt = datetime.today()  # Get timezone naive now
    seconds = dt.timestamp()
    db_client = boto3.client('dynamodb')
    put_items_to_s3(result)
    db_name = 'Analysis_results' # table name
    # construct a dict to save all needed data
    item = {}
    item['asin'] = {"S" : result['asin']} # product asin, partition key
    item['title'] = {"S" : result['title']} # product title
    item['searchAlias'] = {"S" : result['searchAlias'].split('Categories:')[-1].strip()} # product category
    item['mainImage'] = {"S" : result['mainImage']} # product image url
    item['amazon_url'] = {"S" : result['url']} # product url
    item['reviewsTotal'] = {"N" : str(int(result['reviewsTotal'].split(':')[-1]))} # total number of reviews
    item['previousRating'] = {"N" : str(result['previousRating'])} # calculated previous rating
    item['newStarRating'] = {"N" : str(result['newStarRating'])} # calculated new rating
    item['reviewReliability'] = {"N" : str(result['reviewReliability'][:-1])} # calculated review reliability
    item['time_stamp'] = {"N": str(seconds)} # a time stamp
    # S3 url of most frequency occur bigrams image 
    item['S3_MFO_url'] = {"S" : 'https://review-mirror-analysis-images.s3.amazonaws.com/'+result['asin']+'MFO.jpg'} 
    # S3 url of most frequency occur positive & negative bigrams image
    item['S3_PosNeg_url'] = {"S" : 'https://review-mirror-analysis-images.s3.amazonaws.com/'+result['asin']+'PosNeg.jpg'} # 
    
    
    response = db_client.put_item(TableName=db_name, Item=item) # put data to DynamoDB
    return response

def put_items_to_s3(result):
    # {'MFO':''} or {'PosNeg':''}
    bucket_name = 'review-mirror-analysis-images'
    s3 = boto3.resource('s3')
    
    file_name = result['asin']+'MFO'+'.jpg'
    file = result['MFO'].split(',')[-1] # get base64
    object = s3.Object(bucket_name,file_name) # initialize an s3 object
    response = object.put(Body=base64.b64decode(file),ACL = 'public-read') # put MFO image to S3
    # print('put_items_to_s3: ',response)

    file_name = result['asin']+'PosNeg'+'.jpg'
    file = result['PosNeg'].split(',')[-1] # get base64
    object = s3.Object(bucket_name,file_name) # initialize an s3 object
    response = object.put(Body=base64.b64decode(file),ACL = 'public-read') # put MFO image to S3
    # print('put_items_to_s3: ',response)
    return response
    
def handle_get(event,context):
    asin = event['queryStringParameters']['asin']
    db_resource = boto3.resource('dynamodb')
    table = db_resource.Table('Analysis_results')
    if event['queryStringParameters'] is not None:
        fe = Key('asin').eq(asin) # scan items on DynamoDB by asin
        response = table.scan(FilterExpression=fe)
        if response['Items']:
            data = response['Items']
            result = {
                'existing':'yes',
                'asin': data[0]['asin'],
                'S3_PosNeg_url': data[0]['S3_PosNeg_url'],
                'S3_MFO_url': data[0]['S3_MFO_url'],
                'reviewReliability': str(data[0]['reviewReliability']),
                'time_stamp': str(data[0]['time_stamp']),
                'newStarRating': str(data[0]['newStarRating']),
                'previousRating': str(data[0]['previousRating']),
                'mainImage': data[0]['mainImage'],
                'searchAlias': data[0]['searchAlias'],
                'title': data[0]['title'],
                'reviewsTotal': str(data[0]['reviewsTotal']),
                'amazon_url': data[0]['amazon_url']
                
            }
            return {
                'statusCode': 200,
                'headers': {
                    "Access-Control-Allow-Headers": "Content-Type, X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methond": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
                    "Access_Control-Allow-Credentials": "true",
                    "X-Requested_With": "*"
                    
                },
                'body': json.dumps(result)
                
            }
        else:
            return {
                'statusCode': 200,
                'headers': {
                    "Access-Control-Allow-Headers": "Content-Type, X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methond": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
                    "Access_Control-Allow-Credentials": "true",
                    "X-Requested_With": "*"
                    
                },
                'body': json.dumps({'existing':'no'})
                
            }
    else:
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Headers": "Content-Type, X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methond": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
                "Access_Control-Allow-Credentials": "true",
                "X-Requested_With": "*"
                
            },
            'body': json.dumps({'empty'})
            
        }
        
def handle_post(event,context):
    # print(event)
    result = json.loads(event['body'])
    result = json.loads(result['info'])
    put_items_to_db(result)
    
    
    return {
        'statusCode': 200,
        'headers': {
        "Access-Control-Allow-Headers": "Content-Type, X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methond": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
        "Access_Control-Allow-Credentials": "true",
        "X-Requested_With": "*"
            
        },
        'body': json.dumps('success')
        
    }
    
def lambda_handler(event, context):
    if event['httpMethod'] == 'GET':
        return handle_get(event, context)
    elif event['httpMethod'] == 'POST':
        return handle_post(event, context)
    else:
        return {
            'statusCode': 200,
            'body': json.dumps('Hello from Lambda!')
        }
   