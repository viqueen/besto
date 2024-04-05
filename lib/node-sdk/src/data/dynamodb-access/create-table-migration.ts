import {
    CreateTableCommand,
    DeleteTableCommand,
    DynamoDBClient
} from '@aws-sdk/client-dynamodb';
import type {
    CreateTableCommandInput,
    DeleteTableCommandInput,
    TableDescription
} from '@aws-sdk/client-dynamodb';

import { IDynamoDbMigration } from './migration';
import { IDocEntityTable } from './types';

const withLocalSecondaryIndexes = (
    input: CreateTableCommandInput,
    indexed?: Record<string, string>
): CreateTableCommandInput => {
    if (!indexed) return input;
    const withIndexes: CreateTableCommandInput = {
        ...input,
        LocalSecondaryIndexes: []
    };
    return Object.entries(indexed).reduce((params, [fieldName, indexName]) => {
        params.AttributeDefinitions?.push({
            AttributeName: fieldName,
            AttributeType: 'S'
        });
        params.LocalSecondaryIndexes?.push({
            IndexName: indexName,
            KeySchema: [
                { AttributeName: 'part', KeyType: 'HASH' },
                { AttributeName: fieldName, KeyType: 'RANGE' }
            ],
            Projection: {
                ProjectionType: 'ALL'
            }
        });
        return params;
    }, withIndexes);
};

class CreateTableMigration implements IDynamoDbMigration {
    readonly TableName: string;
    constructor(private readonly table: IDocEntityTable) {
        this.TableName = this.table.name;
    }

    async up(client: DynamoDBClient): Promise<TableDescription | undefined> {
        const params: CreateTableCommandInput = {
            TableName: this.table.name,
            AttributeDefinitions: [
                { AttributeName: 'part', AttributeType: 'S' },
                { AttributeName: 'sort', AttributeType: 'S' }
            ],
            KeySchema: [
                { AttributeName: 'part', KeyType: 'HASH' },
                { AttributeName: 'sort', KeyType: 'RANGE' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        };
        const withIndex = withLocalSecondaryIndexes(params, this.table.indexed);
        const { TableDescription } = await client.send(
            new CreateTableCommand(withIndex)
        );
        return TableDescription;
    }

    async down(client: DynamoDBClient): Promise<TableDescription | undefined> {
        const params: DeleteTableCommandInput = {
            TableName: this.table.name
        };
        const { TableDescription } = await client.send(
            new DeleteTableCommand(params)
        );
        return TableDescription;
    }
}

export { CreateTableMigration };
