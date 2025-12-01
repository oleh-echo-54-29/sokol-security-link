/**
 * IndexedDB Service for SOKOL_link
 * Manages storage of link records with timestamp keys
 */

import { INDEXED_DB, type LinkRecord, type StoredLinkRecord } from "../_constants_indexedDB";

/**
 * Initialize and open the IndexedDB database
 * Creates the object store if it doesn't exist
 */
export async function openDbConnection(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(INDEXED_DB.DB_NAME, INDEXED_DB.DB_VERSION_DEFAULT);

        request.onerror = () => {
            reject(new Error(`Failed to open database: ${request.error}`));
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains(INDEXED_DB.STORE_NAME)) {
                const store = db.createObjectStore(INDEXED_DB.STORE_NAME);
                store.createIndex(INDEXED_DB.INDEX, INDEXED_DB.INDEX, { unique: false });
            }
        };
    });
}

/**
 * Ensure database is initialized before operations
 */
async function ensureDbConnection(): Promise<IDBDatabase> {
    const dbInstance = await openDbConnection();

    if (!dbInstance) {
        throw new Error('Database not initialized');
    }
    return dbInstance;
}

/**
 * Add a new link record with current timestamp as key
 * @param record - The link record to store
 * @returns The timestamp key used for storage
 */
export async function storeLink(record: LinkRecord): Promise<number> {
    const db = await ensureDbConnection();
    const key = Date.now();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INDEXED_DB.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(INDEXED_DB.STORE_NAME);
        const request = store.add(record, key);

        request.onsuccess = () => {
            resolve(key);
        };

        request.onerror = () => {
            reject(new Error(`Failed to add link: ${request.error}`));
        };
    });
}

/**
 * Get a link record by its timestamp key
 * @param key - The timestamp key
 * @returns The stored link record or null if not found
 */
export async function getLink(key: number): Promise<LinkRecord | null> {
    const db = await ensureDbConnection();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INDEXED_DB.STORE_NAME, 'readonly');
        const store = transaction.objectStore(INDEXED_DB.STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => {
            resolve(request.result || null);
        };

        request.onerror = () => {
            reject(new Error(`Failed to get link: ${request.error}`));
        };
    });
}

/**
 * Get all link records from the database
 * @returns Array of all stored link records with their keys
 */
export async function getAllLinks(): Promise<StoredLinkRecord[]> {
    const db = await ensureDbConnection();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INDEXED_DB.STORE_NAME, 'readonly');
        const store = transaction.objectStore(INDEXED_DB.STORE_NAME);
        const request = store.openCursor();
        const results: StoredLinkRecord[] = [];

        request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
                results.push({
                    key: cursor.key as number,
                    ...cursor.value
                });
                cursor.continue();
            } else {
                resolve(results);
            }
        };

        request.onerror = () => {
            reject(new Error(`Failed to get all links: ${request.error}`));
        };
    });
}

/**
 * Update an existing link record
 * @param key - The timestamp key
 * @param record - The updated link record
 */
export async function updateLink(key: number, record: LinkRecord): Promise<void> {
    const db = await ensureDbConnection();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INDEXED_DB.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(INDEXED_DB.STORE_NAME);
        const request = store.put(record, key);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(new Error(`Failed to update link: ${request.error}`));
        };
    });
}

/**
 * Delete a link record by its timestamp key
 * @param key - The timestamp key
 */
export async function deleteLink(key: number): Promise<void> {
    const db = await ensureDbConnection();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INDEXED_DB.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(INDEXED_DB.STORE_NAME);
        const request = store.delete(key);

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(new Error(`Failed to delete link: ${request.error}`));
        };
    });
}

/**
 * Clear all link records from the database
 */
export async function clearAll(): Promise<void> {
    const db = await ensureDbConnection();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INDEXED_DB.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(INDEXED_DB.STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => {
            resolve();
        };

        request.onerror = () => {
            reject(new Error(`Failed to clear database: ${request.error}`));
        };
    });
}

/**
 * Get the count of all stored link records
 * @returns The number of records in the database
 */
export async function getCount(): Promise<number> {
    const db = await ensureDbConnection();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INDEXED_DB.STORE_NAME, 'readonly');
        const store = transaction.objectStore(INDEXED_DB.STORE_NAME);
        const request = store.count();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(new Error(`Failed to get count: ${request.error}`));
        };
    });
}

/**
 * Remove all link records older than 24 hours from the database
 * Queries by date index and deletes entries where (Date.now() - key) > 86,400,000 ms
 * @returns Number of records deleted
 */
export async function updateDBdueToCurrentDate(): Promise<number> {
    const db = await ensureDbConnection();
    const now = Date.now();
    const oneDayInMs = 86400000; // 60 * 60 * 24 * 1000

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(INDEXED_DB.STORE_NAME, 'readwrite');
        const store = transaction.objectStore(INDEXED_DB.STORE_NAME);
        const index = store.index(INDEXED_DB.INDEX);
        const request = index.openCursor();
        let deletedCount = 0;

        request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
                const key = cursor.key as number;
                const age = now - key;

                // If record is older than 24 hours, delete it
                if (age > oneDayInMs) {
                    cursor.delete();
                    deletedCount++;
                }
                cursor.continue();
            } else {
                // All records processed
                resolve(deletedCount);
            }
        };

        request.onerror = () => {
            reject(new Error(`Failed to update database: ${request.error}`));
        };
    });
}

/**
 * Close the database connection
 */
export async function closeDbConnection(): Promise<void> {
    const dbInstance = await openDbConnection();
    if (!dbInstance) return;

    dbInstance.close();
}