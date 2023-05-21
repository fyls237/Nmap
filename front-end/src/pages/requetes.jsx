import React, { useState } from 'react' 
import Link from 'next/link' 
import { BsPerson } from 'react-icons/bs' 
import axios from 'axios' 
import { useRouter } from 'next/router'

function Requetes() {
  const [requete, setRequete] = useState('') 
  const [option, setOption] = useState('') 
  const [nmapOption, setNmapOption] = useState('') 
  const [ipAddress, setIpAddress] = useState('') 

  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault() 
    const data = {
      requete: "nmap",
      option: option,
      nmapOption: nmapOption,
      ipAddress: ipAddress
    } 

    axios
      .post('http://localhost:3001/route', data)
      .then((response) => {
        console.log('Reponse du serveur:', response.data) 
        setRequete('') 
        setOption('') 
        setNmapOption('') 
        setIpAddress('') 
        router.push('/resultat')
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi des données:', error) 
        console.log("entrez les bonnes options")
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
            <Link href="/historique">
              <div>Historique</div>
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
          <form className="mt-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Entrez votre requête"
              className="border border-gray-400 rounded px-4 py-2 mb-2"
              value="nmap"
              onChange={(e) => setRequete(e.target.value)}
              disabled
            />
            
            <select
              className="border border-gray-400 rounded px-4 py-2 mb-2"
              value={nmapOption}
              onChange={(e) => setNmapOption(e.target.value)}
            >
              <option value="">Sélectionnez une scan option</option>
              <option value="-sS">-sS</option>
              <option value="-sV">-sV</option>
              <option value="-sU">-sU</option>
              <option value="-sM">-sM</option>
              <option value="-sl">-sl</option>
              <option value="-PR">-PR</option>
              {/* Add more Nmap options here */}
            </select>


            <select
              className="border border-gray-400 rounded px-4 py-2 mb-2"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="">Sélectionnez une option</option>
              <option value="--max-retries">--max-retries</option>
              <option value="--host-timeout">--host-timeout</option>
              <option value="--scan-delay">--scan-delay</option>
              <option value="--max-scan-delay">--max-scan-delay</option>
              <option value="--min-hostgroup">--min-hostgroup</option>
            </select>


            <input
              type="text"
              placeholder="Entrez une adresse IP"
              className="border border-gray-400 rounded px-4 py-2 mb-2"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-800 hover:bg-blue-600 text-white rounded px-4 py-2"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Requetes