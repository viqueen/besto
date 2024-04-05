import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import type { TableDescription } from '@aws-sdk/client-dynamodb';

interface IDynamoDbMigration {
    readonly TableName: string;
    up: (client: DynamoDBClient) => Promise<TableDescription | undefined>;
    down: (client: DynamoDBClient) => Promise<TableDescription | undefined>;
}

export type { IDynamoDbMigration };
