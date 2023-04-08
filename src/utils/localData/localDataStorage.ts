import { LocalDataInterface } from "@/models";

export function storageData<T>(data: T, key: string) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function storageDataWithTimeStamp<T>(data: T, key: string) {
  const dataToBeStored: LocalDataInterface<T> = {
    data,
    previousTimeStamp: Date.now(),
  };

  localStorage.setItem(key, JSON.stringify(dataToBeStored));
}

export function getLocalData<T>(key: string): T | undefined {
  const data = localStorage.getItem(key);
  return data !== null ? (JSON.parse(data) as T) : undefined;
}

export function getLocalDataWithTimeStamp<T>(
  key: string
): LocalDataInterface<T> | undefined {
  const data = localStorage.getItem(key);

  return data !== null
    ? (JSON.parse(data) as LocalDataInterface<T>)
    : undefined;
}
