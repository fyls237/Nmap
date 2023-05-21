import { useState } from 'react' 
import axios from 'axios' 
import { useRouter } from 'next/router' 
import Link from 'next/link' 

const SignIn = () => {
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('') 
  
  const router = useRouter() 

  const handleSignIn = async (e) => {
    e.preventDefault() 

    try {
      const response = await axios.post('http://localhost:3001/signin', { email, password }) 

      const { token } = response.data 

      setEmail('') 
      setPassword('') 
      router.push("/Accueil") 
    } catch (error) {
      console.error('Erreur lors de la connexion :', error) 
      setError('Identifiants invalides. Veuillez réessayer.') 
    }
  } 

  return (
    <div className='absolute top-0 left-0 w-full h-full bg-cover bg-repeat bg-center animate-moveBackground'>
      <div className="flex justify-center items-center h-screen ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSignIn}>
          <h2 className="text-2xl font-bold mb-4">Bienvenue entrez vos identifiants</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link
              href="/SignUp"
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
      
  ) 
} 

export default SignIn 