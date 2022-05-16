import json
import pandas as pd
import numpy as np
import boto3
import io

    
def handle_get(event,context):
    s3 = boto3.client('s3')
    bucket_name = 'python-dependencys-review-mirror'
    s3_file_key = 'quiz_2000.csv'
    
    # initialize a resource
    obj = s3.get_object(Bucket=bucket_name, Key=s3_file_key)
    
    df = pd.read_csv(io.BytesIO(obj['Body'].read()))
    quiz_5 = df.sample(5).to_dict()
    result = {}
    for i in range(0,5):
        result[i+1] = {'id': list(quiz_5['label'].keys())[i],
                       'label': list(quiz_5['label'].values())[i],
                       'text': list(quiz_5['text_'].values())[i]}
    
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
    
    
        
    
def lambda_handler(event, context):
    if event['httpMethod'] == 'GET':
        return handle_get(event, context)
    # elif event['httpMethod'] == 'POST':
    #     return handle_post(event, context)
    else:
        return {
            'statusCode': 200,
            'body': json.dumps('Hello from Lambda!')
        }
   