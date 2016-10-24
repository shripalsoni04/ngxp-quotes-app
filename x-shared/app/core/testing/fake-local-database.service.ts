import { ClassProvider } from '@angular/core';

import { LocalDatabaseService } from '../local-database.service';

export { LocalDatabaseService } from '../local-database.service';

export class FakeLocalDatabaseService {

  getList(collectionName: string) { }

  getById(collectionName: string, id: number) { }

  insert(collectionName: string, value: any) { }

  update(collectionName: string, value: any) { }

  delete(collectionName: string, value: any) { }
}

export const fakeLocalDatabaseServiceProvider: ClassProvider = {
  provide: LocalDatabaseService,
  useClass: FakeLocalDatabaseService
};
