'use client'

import localforage from 'localforage'

const store = localforage.createInstance({
  name: 'auto-resume',
  storeName: 'app_data',
  description: 'Varaq application data store'
})

export async function getStorageItem<T>(key: string): Promise<T | null> {
  try {
    return await store.getItem<T>(key)
  } catch (error) {
    console.error(`[Storage] Error reading key "${key}":`, error)
    return null
  }
}

export async function setStorageItem<T>(key: string, value: T): Promise<void> {
  try {
    await store.setItem(key, value)
  } catch (error) {
    console.error(`[Storage] Error writing key "${key}":`, error)
    throw error
  }
}

export async function removeStorageItem(key: string): Promise<void> {
  try {
    await store.removeItem(key)
  } catch (error) {
    console.error(`[Storage] Error removing key "${key}":`, error)
    throw error
  }
}

export async function clearStorage(): Promise<void> {
  try {
    await store.clear()
  } catch (error) {
    console.error('[Storage] Error clearing storage:', error)
    throw error
  }
}
