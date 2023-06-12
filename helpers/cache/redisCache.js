import { createClient } from 'redis'
import { promisify } from 'util'

async function initRedisClient() {
  try {
    const client = createClient({
      url: process.env.REDIS_HOST,
    })
    client.on('error', (error) =>
      console.log('Redis Client Connection Error', error),
    )
    await client.connect()
    console.log('Redis cashe app database connected...')
    return client
  } catch (error) {
    console.log('Redis app connection Error...', error)
  }
}

export { initRedisClient }
