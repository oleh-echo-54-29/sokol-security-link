export enum INDEXED_DB {
    DB_NAME = 'SOKOL_link',
    DB_VERSION_DEFAULT = 1,
    STORE_NAME = 'links',
    INDEX = 'byDate',
}



export interface LinkRecord {
    link: string;
    status: boolean;
}

export interface StoredLinkRecord extends LinkRecord {
    key: number;
}


