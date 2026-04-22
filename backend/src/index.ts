import { Hono } from 'hono'
import handler from '../controller'

type Bindings = {
  TELEGRAM_BOT_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  const body : Promise<unknown> = c.req.json()
  return c.body(body)
})

app.post('/', async (c) => {
  const body = await c.req.json()
  await handler(body, c.env.TELEGRAM_BOT_TOKEN)
  console.log(body)
  return c.text('OK')
})


export default app
