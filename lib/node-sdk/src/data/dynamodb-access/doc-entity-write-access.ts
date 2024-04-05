import type {
  BatchWriteCommandInput,
  DeleteCommandInput,
  PutCommandInput,
} from "@aws-sdk/lib-dynamodb";
import {
  BatchWriteCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

import {
  DocEntity,
  IDocEntityWriteAccess,
  SaveDocEntityInput,
} from "../access";

import { IDynamoDbTransforms } from "./transforms";
import { IDocEntityTable } from "./types";

class DocEntityWriteAccess<TEntity extends DocEntity>
  implements IDocEntityWriteAccess<TEntity>
{
  constructor(
    private readonly ddbDocClient: DynamoDBDocumentClient,
    private readonly transforms: IDynamoDbTransforms,
    private readonly table: IDocEntityTable,
  ) {}

  async saveOne(entity: SaveDocEntityInput<TEntity>): Promise<TEntity> {
    const item = this.mapEntityToItem(entity);
    const params: PutCommandInput = {
      TableName: this.table.name,
      Item: this.transforms.marshall({
        ...item,
      }),
    };

    await this.ddbDocClient.send(new PutCommand(params));
    return item;
  }

  async removeOne(entity: Pick<TEntity, "sort">): Promise<void> {
    const params: DeleteCommandInput = {
      TableName: this.table.name,
      Key: {
        part: this.table.part,
        sort: entity.sort,
      },
    };
    await this.ddbDocClient.send(new DeleteCommand(params));
  }

  async saveMany(entities: SaveDocEntityInput<TEntity>[]): Promise<TEntity[]> {
    const items = entities.map((entity) => this.mapEntityToItem(entity));
    const putRequestItems = items.map((item) => ({
      PutRequest: {
        Item: this.transforms.marshall({ ...item }),
      },
    }));
    const params: BatchWriteCommandInput = {
      RequestItems: {
        [this.table.name]: putRequestItems,
      },
    };

    await this.ddbDocClient.send(new BatchWriteCommand(params));
    return items;
  }

  private mapEntityToItem(entity: SaveDocEntityInput<TEntity>): TEntity {
    const { sort, ...record } = entity;
    const id = `${this.table.part}---${sort}`;
    const createdAt = record.createdAt ?? new Date();
    const item = {
      id,
      part: this.table.part,
      sort,
      ...record,
      createdAt,
      updatedAt: new Date(),
    };
    return item as TEntity;
  }
}

export { DocEntityWriteAccess };
