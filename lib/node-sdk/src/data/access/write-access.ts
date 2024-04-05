import { DocEntity } from './entity';

type SaveDocEntityInput<TEntity extends DocEntity> = Partial<
    Omit<TEntity, 'id' | 'part' | 'updatedAt' | 'removedAt'>
> &
    Required<Pick<TEntity, 'sort'>>;

interface IDocEntityWriteAccess<TEntity extends DocEntity> {
    saveOne(input: SaveDocEntityInput<TEntity>): Promise<TEntity>;
    saveMany(entities: SaveDocEntityInput<TEntity>[]): Promise<TEntity[]>;
    removeOne(entity: Pick<TEntity, 'sort'>): Promise<void>;
}

export type { IDocEntityWriteAccess, SaveDocEntityInput };
