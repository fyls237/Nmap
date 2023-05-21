import React, { useState } from "react" 
import axios from "axios" 
import Link from "next/link" 


const SignUp = () => {
  const [name, setName] = useState("") 
  const [email, setEmail] = useState("") 
  const [password, setPassword] = useState("") 
  const [error, setError] = useState(null) 
  const [success, setSuccess] = useState(false) 

  const handleSubmit = async (e) => {
    e.preventDefault() 

    try {
      const response = axios.post("http://localhost:3001/signup", { name, email, password }) 
      console.log(response.data) 

      setSuccess(true) 
      setError(null) 
    } catch (error) {
      console.error(error) 
      setError("Erreur lors de la création de l'utilisateur") 
      setSuccess(false) 
    }
  } 

  return (
    <div className='absolute top-0 left-0 w-full h-full bg-cover bg-repeat bg-center animate-moveBackground'>
      <div className="flex justify-center items-center h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Créer un nouveau compte</h2>
          {success && <p className="text-green-500 mb-4">Utilisateur créé avec succès !</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              S'inscrire
            </button>
            <Link
              href="/SignIn"
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  ) 
} 

export default SignUp