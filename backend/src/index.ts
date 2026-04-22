import { Hono } from 'hono'
import handler from '../controller'

const app = new Hono()

app.get('/', (c) => {
  const body : Promise<unknown> = c.req.json()
  return c.body(body)
})

app.post('/', async (c) => {
  const body = await c.req.json()
  await handler(body)
  console.log(body)
  return c.text('OK')
})


export default app
