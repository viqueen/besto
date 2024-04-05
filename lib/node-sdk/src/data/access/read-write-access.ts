import { DocEntity } from './entity';
import { IDocEntityReadAccess } from './read-access';
import { IDocEntityWriteAccess } from './write-access';

interface IDocEntityAccess<TEntity extends DocEntity> {
    reader: IDocEntityReadAccess<TEntity>;
    writer: IDocEntityWriteAccess<TEntity>;
}

export type { IDocEntityAccess };
