import  {expect, test, describe } from 'bun:test'
import app from './app'

describe('Example', () => {
    test('GET /posts', async () => {
      const res = await app.request('/')
      expect(res.status).toBe(200)
      expect(await res.text()).toEqual('Hello Honō!')
    })
  })