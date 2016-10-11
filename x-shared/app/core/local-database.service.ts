import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class LocalDatabaseService {

  constructor(private storageService: StorageService) {

  }

  getList(collectionName: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let data: any[] = [];
      let rawData: string = this.storageService.getItem(collectionName);
      if (rawData) {
        data = JSON.parse(rawData);
      }
      resolve(data);
    });

  }

  getById(collectionName: string, id: number): Promise<any> {
    return this.getList(collectionName).then((data) => {
      return this.findItemById(data, id);
    });
  }

  insert(collectionName: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('Value cannot be blank');
      }

      let obj = this.getCopy(value);
      this.getList(collectionName).then((data) => {
        // create id if not set.
        if (obj.id) {
          let isDataExists = !!(data.filter(item => item.id === obj.id).length);
          if (isDataExists) {
            reject(`Data with ${obj.id} already exists in database.`);
          }
        } else {
          obj.id = this.getNextId(data);
        }

        data.push(obj);
        this.storageService.setItem(collectionName, JSON.stringify(data));
        resolve(obj);
      });
    });
  }

  update(collectionName: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!value.id) {
        reject('Value must have id property');
      }
      this.getList(collectionName).then((data) => {
        let existingObj = this.findItemById(data, value.id);

        if (!existingObj) {
          reject('Data you want to update does not exists.');
        }

        data.splice(data.indexOf(existingObj), 1, value);
        this.storageService.setItem(collectionName, JSON.stringify(data));
        resolve(value);
      });
    });
  }

  delete(collectionName: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!value.id) {
        reject('Value must have id property');
      }

      this.getList(collectionName).then((data) => {
        let existingObj = this.findItemById(data, value.id);

        if (!existingObj) {
          reject('Data you want to delete does not exists.');
        }

        data.splice(data.indexOf(existingObj), 1);
        this.storageService.setItem(collectionName, JSON.stringify(data));
        resolve();
      });
    });
  }

  private findItemById(collection: any[], id: number) {
    let existingData = collection.filter(item => item.id === id);
    return existingData ? existingData[0] : null;
  }

  private getCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  private getNextId(data: any[]) {
    if (data.length) {
      let maxId = Math.max.apply(null, data.map(item => item.id));
      return maxId + 1;
    } else {
      return 1;
    }
  }
}
