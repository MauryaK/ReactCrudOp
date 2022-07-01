
import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3004/",
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
})
