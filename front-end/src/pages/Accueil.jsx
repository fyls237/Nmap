import React from 'react'
import { BsPerson } from 'react-icons/bs'
import Link from 'next/link'


function Accueil() {
  return (
    <div>
      <div className="container mx-auto flex justify-between items-center bg-gray-800 py-4">
        <div className="text-white">
          <h2 className="text-xl font-bold">NMAP-Interface</h2>
        </div>
        <ul className="flex space-x-4 justify-center">
          <li className="bg-blue-500 py-2 px-4 text-white rounded-full">
            <Link href={"/requetes"}>
              <div>Requete</div>
            </Link>
          </li>
          <li className="bg-blue-500 py-2 px-4 text-white rounded-full">
            <Link href={"/resultat"}>
              <div>Resultat</div>
            </Link>
          </li>
          <li className="bg-blue-500 py-2 px-4 text-white rounded-full">
            <Link href={"/historique"}>
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
      </div>
    </div>
    </div>
  )
}

export default Accueil