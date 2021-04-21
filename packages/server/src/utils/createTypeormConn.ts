import { createConnection } from 'typeorm';

export const createTypeormConn = () => {
  createConnection().catch((error) => console.log(error));
};
