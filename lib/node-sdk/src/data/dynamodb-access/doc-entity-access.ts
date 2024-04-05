import {
    DocEntity,
    IDocEntityAccess,
    IDocEntityReadAccess,
    IDocEntityWriteAccess
} from '../access';

class DocEntityAccess<TEntity extends DocEntity>
    implements IDocEntityAccess<TEntity>
{
    constructor(
        readonly reader: IDocEntityReadAccess<TEntity>,
        readonly writer: IDocEntityWriteAccess<TEntity>
    ) {}
}

export { DocEntityAccess };
