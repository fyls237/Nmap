import React, { useState, useEffect } from 'react' 
import Link from 'next/link' 
import { BsPerson } from 'react-icons/bs' 
import axios from 'axios' 

function Historique() {
  const [historique, setHistorique] = useState([]) 

  useEffect(() => {
    axios
      .get('http://localhost:3001/historique')
      .then((response) => {
        setHistorique(response.data) 
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'historique des requêtes:", error) 
      }) 
  }, []) 

  const supprimerRequete = (id) => {
    axios
      .delete(`http://localhost:3001/route/${id}`)
      .then(() => {
        console.log('Requête supprimée avec succès') 
        setHistorique(historique.filter((requete) => requete._id !== id)) 
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de la requête:', error) 
      }) 
  } 

  return (
    <div>
      <div className="container mx-auto flex justify-between items-center bg-gray-800 py-4">
        <div className="text-white">
          <h2 className="text-xl font-bold">NMAP-Interface</h2>
        </div>
        <ul className="flex space-x-4 justify-center">
          <li className="bg-blue-500 py-2 px-4 text-white rounded-full">
            <Link href="/Accueil">
              <div>Accueil</div>
            </Link>
          </li>
          <li className="bg-blue-500 py-2 px-4 text-white rounded-full">
            <Link href="/requetes">
              <div>Requetes</div>
            </Link>
          </li>
        </ul>
        <div className="flex items-center">
          <BsPerson className="text-2xl text-gray-500 mr-2" />
        </div>
      </div>
      <div className="body-accueil flex justify-center items-center h-screen">
        <div className="bg-blue-500 rounded-lg p-8">
          <p className="text-gray-800 text-center">
            Bienvenue sur NMAP-Interface ! Ici, vous pourrez exécuter des requêtes Nmap,
            afficher les résultats et l'historique de vos différentes requêtes.
          </p>
          <h3 className="text-gray-800 text-center mt-4 font-bold">Historique des requêtes</h3>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full bg-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-gray-800 text-white">Commande</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Option</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Option Nmap</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Adresse IP</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Résultat</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Date</th>
                  <th className="px-4 py-2 bg-gray-800 text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {historique.map((requete) => (
                  <tr key={requete._id} className="text-gray-800">
                    <td className="px-4 py-2 whitespace-pre-wrap">{requete.requete}</td>
                    <td className="px-4 py-2 whitespace-pre-wrap">{requete.option}</td>
                    <td className="px-4 py-2 whitespace-pre-wrap">{requete.nmapOption}</td>
                    <td className="px-4 py-2 whitespace-pre-wrap">{requete.ipAddress}</td>
                    <td className="px-4 py-2 whitespace-pre-wrap">{requete.resultat}</td>
                    <td className="px-4 py-2">{new Date(requete.date).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => supprimerRequete(requete._id)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default Historique 
