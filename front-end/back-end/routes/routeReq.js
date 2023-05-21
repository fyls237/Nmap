import express from 'express' 
import model from '../db/models/modelReq.js' 
import { spawn } from 'child_process' 

const route = express.Router() 

route.post('/route', (req, res) => {
  const { requete, option, nmapOption, ipAddress } = req.body 

  const nmapArgs = [requete, option, nmapOption, ipAddress] 
  const nmapProcess = spawn('nmap', nmapArgs) 

  let output = '' 

  nmapProcess.stdout.on('data', (data) => {
    output += data.toString() 
  }) 

  nmapProcess.on('close', (code) => {
    if (code === 0) {
      const instance = new model({
        requete: requete,
        option: option,
        nmapOption: nmapOption,
        ipAddress: ipAddress,
        resultat: output,
        date: Date.now()
      }) 

      instance.save()
        .then(() => {
          res.send('Données enregistrées avec succès') 
        })
        .catch(error => {
          console.error('Erreur lors de l\'enregistrement des données:', error)
          res.status(500).send('Erreur lors de l\'enregistrement des données')
        }) 
    } else {
      res.status(500).send('Erreur lors de l\'exécution de la commande Nmap')
    }
  })
})

route.get('/historique', (req, res) => {
  model.find().sort({ date: -1 })
    .then(requests => {
      res.json(requests)
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error)
      res.status(500).send('Erreur lors de la récupération des données')
    })
})

route.get('/resultat', (req, res) => {
  model.findOne().sort({ date: -1 })
    .then(request => {
      res.json(request)
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données:', error)
      res.status(500).send('Erreur lors de la récupération des données')
    })
})


route.delete('/route/:id', (req, res) => {
  const requestId = req.params.id

  model.findByIdAndDelete(requestId)
    .then(() => {
      res.send('Requête supprimée avec succès')
    })
    .catch(error => {
      console.error('Erreur lors de la suppression de la requête:', error)
      res.status(500).send('Erreur lors de la suppression de la requête')
    })
})

export default route
