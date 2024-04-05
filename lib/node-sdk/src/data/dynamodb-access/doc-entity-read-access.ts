import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import type { GetCommandInput, QueryCommandInput } from "@aws-sdk/lib-dynamodb";

import { DocEntity, IDocEntityReadAccess } from "../access";

import { IDynamoDbTransforms } from "./transforms";
import { IDocEntityTable } from "./types";

class DocEntityReadAccess<TEntity extends DocEntity>
  implements IDocEntityReadAccess<TEntity>
{
  constructor(
    private readonly ddbDocClient: DynamoDBDocumentClient,
    private readonly transforms: IDynamoDbTransforms,
    private readonly table: IDocEntityTable,
  ) {}

  async findBySort({ sort }: { sort: string }): Promise<TEntity | null> {
    const params: GetCommandInput = {
      TableName: this.table.name,
      Key: {
        part: this.table.part,
        sort,
      },
    };

    const { Item } = await this.ddbDocClient.send(new GetCommand(params));
    return this.transforms.unmarshall(Item) as TEntity;
  }

  async query(
    fields: Partial<TEntity>,
    indexName?: string,
  ): Promise<TEntity[]> {
    const input = { ...fields, part: this.table.part };
    const condition = Object.keys(input)
      .map((key) => `${key} = :${key}`)
      .join(" AND ");
    const attributes = Object.entries(input).reduce(
      (data, entry) => {
        data[`:${entry[0]}`] = entry[1];
        return data;
      },
      {} as Record<string, unknown>,
    );
    const params: QueryCommandInput = {
      TableName: this.table.name,
      KeyConditionExpression: condition,
      ExpressionAttributeValues: { ...attributes },
      IndexName: indexName,
    };
    const { Items } = await this.ddbDocClient.send(new QueryCommand(params));
    if (Items) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Items.map((item: any) =>
        this.transforms.unmarshall(item),
      ) as TEntity[];
    }
    return [];
  }
}

export { DocEntityReadAccess };
