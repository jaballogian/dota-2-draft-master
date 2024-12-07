import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_DOTA2_BASE_API_URL

const headers = { 'Content-Type': 'application/json' }

export default axios.create({
  baseURL: baseURL,
  headers: headers
})