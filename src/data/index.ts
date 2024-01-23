import { Todo, User } from '../types';

export const sampleUsers: User[] = [
  {
    id: '886c25c8-f0c5-4af4-b1da-63b5af553039',
    name: 'John Doe',
    email: 'john@gmail.com',
  },
  {
    id: '03da6dab-9772-4e1a-9228-0528de234936',
    name: 'Jane Doe',
    email: 'jane@gmail.com',
  },
];

export let todos: Todo[] = [
  {
    id: '63c2b559-5b4d-48be-853c-982950acce0d',
    title: 'Learn TypeScript',
    completed: false,
    user: '886c25c8-f0c5-4af4-b1da-63b5af553039',
  },
  {
    id: 'c3bc543f-ebb9-41cb-8372-6ae0d556ea34',
    title: 'Learn Hono',
    completed: false,
    user: '03da6dab-9772-4e1a-9228-0528de234936',
  },
  {
    id: 'c3bc543f-ebb9-41cb-8372-6ae0d556ea35',
    title: 'Learn React',
    completed: false,
    user: '03da6dab-9772-4e1a-9228-0528de234936',
  },
];
