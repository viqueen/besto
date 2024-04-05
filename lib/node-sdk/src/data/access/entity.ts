interface Entity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    removedAt: Date | null;
}

interface PartSort {
    part: string;
    sort: string;
}

interface DocEntity extends Entity, PartSort {}

export type { DocEntity };
