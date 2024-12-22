'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/register', {
        email,
        password,
      })

      console.log(response)

      if (response.status === 201 || response.status === 200) {
        //Check for success status codes
        toast.success(
          'Registration successful! Check your email for verification.',
        )
        setEmail('')
        setPassword('')
      } else {
        toast.error('Registration failed. Please try again later.')
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.',
      ) //Handle errors gracefully.
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Register</h1>
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Register
