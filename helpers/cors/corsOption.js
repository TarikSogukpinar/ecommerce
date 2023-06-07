import dotenv from 'dotenv'

const envFile =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({
  path: envFile,
})

const corsOption = {
  origin: [
    `http://${process.env.CLIENT_HOST}`,
    `https://${process.env.CLIENT_HOST}`,
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}

export default corsOption
