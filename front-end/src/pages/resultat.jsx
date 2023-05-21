import React, { useEffect, useState } from 'react' 
import axios from 'axios' 
import { BsPerson } from 'react-icons/bs' 
import Link from 'next/link' 

function Resultat() {
  const [result, setResult] = useState(null) 

  useEffect(() => {
    fetchLastRequest() 
  }, []) 

  const fetchLastRequest = async () => {
    try {
      const response = await axios.get('http://localhost:3001/resultat') 
      console.log(response.data) 
      setResult(response.data) 
    } catch (error) {
      console.error('Erreur lors de la récupération des résultats:', error) 
    }
  } 

  return (
    <div>
      <div className="container mx-auto flex justify-between items-center bg-gray-800 py-4">
        <div className="text-white">
          <h2 className="text-xl font-bold">NMAP-Interface</h2>
        </div>
        <div className="flex items-center">
          <BsPerson className="text-2xl text-gray-500 mr-2" />
        </div>
      </div>
      <div className="body-result flex justify-center items-center h-screen">
        <div className="bg-blue-500 rounded-lg p-8">
          <h2 className="text-gray-800 text-2xl font-bold mb-4 text-center">Résultats</h2>
          {result ? (
            <table className="w-full bg-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-800 text-white">Commande</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Option</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Option Nmap</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Adresse IP</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Résultat</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800">
                  <td className="px-4 py-2">{result.requete}</td>
                  <td className="px-4 py-2">{result.option}</td>
                  <td className="px-4 py-2">{result.nmapOption}</td>
                  <td className="px-4 py-2">{result.ipAddress}</td>
                  <td className="px-4 py-2">
                    <pre>{result.resultat}</pre>
                  </td>
                  <td className="px-4 py-2">{new Date(result.date).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p className="text-gray-800 text-center">Aucun résultat disponible.</p>
          )}
          <div className="flex justify-between mt-4">
            <Link href="/Accueil" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
              Retour
            </Link>
            <Link
              href="/requetes"
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Nouvelle requête
            </Link>
            <Link
              href="/historique"
              className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Historique des requêtes
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default Resultat 

