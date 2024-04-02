import { useHttp } from '@/composables/http'

class ApiService {
  getUsers () {
    return useHttp.get('/users')
  }

  getTodos () {
    return useHttp.get('/todos')
  }

  addTodo (todo) {
    return useHttp.post('/todos', todo)
  }
}

export const apiService = new ApiService()
