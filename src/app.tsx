import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { todos, sampleUsers } from './data';
import { Todo, User } from './types';
import bookRouter from './routes/books';
import { streamText } from 'hono/streaming';
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import Top from './page';

const app = new Hono();

app.use('*', logger());

app.get('/', (c) => {
  return c.text('Hello Honō!');
});


// wip
const route = app.post(
  '/posts',
  zValidator(
    'json',
    z.object({
      body: z.string(),
    })
  ),
  (c) => {
    return c.json(
      {
        ok: true,
        message: 'Created!',
      },
      201
    )
  }
)
// wip
app.get('/posts', (c) => {
  return c.json(
    {
      ok: true,
      message: 'Created!',
    },
    201
  )
})


app.get('/messages', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})

app.route('/books', bookRouter);

app.get('/stream', (c) => {
  return streamText(c, async (stream) => {
    for (let i = 0; i < 10; i++) {
      // Write a text with a new line ('\n').
      await stream.writeln(`Hello ${i}`);
      // Wait 1 second.
      await stream.sleep(500);
      // Write a text without a new line.
      await stream.write(`Hono!`);
    }
  });
});

// get all todos
app.get('/todos', (c) => {
  return c.text(JSON.stringify(todos));
});
// get a todo by id
app.get('/todos/:id', async (c) => {
  const todo = todos.find((todo) => todo.id === c.req.param('id'));
  console.log('todo', todo);
  if (!todo) {
    return c.text('Todo not found', 404);
  }
  return c.text(JSON.stringify(todo));
});
// get ALL todos by user id
app.get('/todos/user/:id', async (c) => {
  const userTodos = todos.filter((todo) => todo.user === c.req.param('id'));
  console.log('userTodos', userTodos);
  if (!userTodos) {
    return c.text('Todos not found', 404);
  }
  return c.text(JSON.stringify(userTodos));
});

// create a todo
app.post('/todos', async (c) => {
  const todo: Todo = await c.req.json();
  todos.push(todo);
  console.log('todos', todos);
  return c.text(JSON.stringify(todo));
});

// update a todo
app.put('/todos/:id', async (c) => {
  const todo: Todo = await c.req.json();
  const todoIndex = todos.findIndex((todo) => todo.id === c.req.param('id'));
  if (todoIndex === -1) {
    return c.text('Todo not found', 404);
  }
  todos[todoIndex] = todo;
  return c.text(JSON.stringify(todo));
});

// delete a todo
app.delete('/todos/:id', (c) => {
  const undeletedTodos = todos.filter((todo) => todo.id !== c.req.param('id'));
  console.log('undeletedTodos', undeletedTodos);
  return c.text('Todo deleted');
});

// get all users
app.get('/users', (c) => {
  return c.text(JSON.stringify(sampleUsers));
});

// get a user by id
app.get('/users/:id', async (c) => {
  const user = sampleUsers.find((user) => user.id === c.req.param('id'));
  if (!user) {
    return c.text('User not found', 404);
  }
  return c.text(JSON.stringify(user));
});

// create a user
app.post('/users', async (c) => {
  const user: User = await c.req.json();
  sampleUsers.push(user);
  return c.text(JSON.stringify(user));
});

// update a user
app.put('/users/:id', async (c) => {
  const user: User = await c.req.json();
  const userIndex = sampleUsers.findIndex(
    (user) => user.id === c.req.param('id')
  );
  if (userIndex === -1) {
    return c.text('User not found', 404);
  }
  sampleUsers[userIndex] = user;
  return c.text(JSON.stringify(user));
});

// delete a user
app.delete('/users/:id', (c) => {
  const users = sampleUsers.filter((user) => user.id !== c.req.param('id'));
  console.log('users', users);
  return c.text('User deleted');
});

export default app;
