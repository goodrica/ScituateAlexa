#!/usr/bin/env bash
cd /Users/jamesgrady/Downloads/dynamodb_local_latest && java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -inMemory -port 4000