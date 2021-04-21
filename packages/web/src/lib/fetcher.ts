import { request } from 'graphql-request';
export const endpoint = 'http://localhost:4000';
export const fetcher = (query: any) => request(endpoint, query);
