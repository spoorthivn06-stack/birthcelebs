import { useState, useEffect } from 'react'
import { supabase } from '../utilss/supabase' // This will look back one folder, find 'utils', and grab 'supabase'

export default function Page() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function getTodos() {
      // Fetches data from your table
      const { data: todos, error } = await supabase.from('todos').select()

      if (error) {
        console.error("Database error:", error.message)
      }

      if (todos) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Database Items</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '20px', listStyle: 'none' }}>
            <h3>{todo.name || todo.text}</h3> {/* Displays text/name */}
            
            {/* If you have an image URL column */}
            {todo.image_url && <img src={todo.image_url} alt="Database item" style={{ width: '200px' }} />}
            
            {/* If you have an audio URL column */}
            {todo.audio_url && (
              <div style={{ marginTop: '10px' }}>
                <audio controls src={todo.audio_url} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}