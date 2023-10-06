/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="../typings/global" />
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configuration } from '../src/config';
dotenv.config();
// function patchAsyncDataSourceSetup() {
//       const oldIsDataSource = InstanceChecker.isDataSource;
//       InstanceChecker.isDataSource = function(obj: unknown): obj is DataSource {
//             if (obj instanceof Promise) {
//                   return true;
//             }
//             return oldIsDataSource(obj);
//       }
// }
// patchAsyncDataSourceSetup();

const ormconfig = async (): Promise<DataSource> => {
      const config = <{ db: DataSourceOptions }> await configuration();
      return new DataSource({
            ...config.db,
            entities: [`${__dirname}/../src/modules/**/entities/*.{js,ts}`],
            migrations: [`${__dirname}/../src/migration/*.{js,ts}`],
            migrationsRun: true,
            migrationsTableName: 'migrations',
      });
};

// eslint-disable-next-line import/no-default-export
export default ormconfig();
