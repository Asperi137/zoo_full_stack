import { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import Evenements from 'Types/Evenements'
import { agirSurEspeces } from 'controllers/especes'
import { withSessionRoute } from 'lib/withSession'

mongooseConnect()
const API_adr = process.env.API_adr
/**
 * @swagger
 * /api/especes/nourrir:
 *   post:
 *     tags: [Especes]
 *     description: Creer un evenement de nourrissage
 *     responses:
 *       201:
 *         description: nourrissage ajouté
 *       400:
 *         description: error
 */
export default withSessionRoute(nourrir)

async function nourrir (
  req: NextApiRequest,
  res: NextApiResponse<Evenements | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    if (req.session.user) {
      if (req.method === 'POST') {
        agirSurEspeces('nourrissage', req, res)
      } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed ici`)
      }
    } else res.status(401).end(`Utilisateur non autorisé`)
  })
}
