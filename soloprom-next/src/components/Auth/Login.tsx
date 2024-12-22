import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation' // if you are using next/navigation

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      })

      if (response.status === 200 || response.status === 201) {
        toast.success('Login successful!')
        localStorage.setItem('authToken', response.data.access_token) // Or whatever token your backend sends back.
        router.push('/profile') // Redirect user to profile page or wherever you need
      } else {
        toast.error('Login failed. Please try again.')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.') //Handle errors gracefully
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
