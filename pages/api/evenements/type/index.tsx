import { NextApiRequest, NextApiResponse } from 'next'
import mongooseConnect from 'lib/mongooseConnect'
import ResponseError from 'Types/ResponseError'
import { getTypeEvenements } from 'controllers/typeEvenement'
import Type_evenements from 'Types/Type_evenements'

mongooseConnect()

export default function Handler (
  req: NextApiRequest,
  res: NextApiResponse<Type_evenements[] | Type_evenements | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET')

    if (req.method === 'GET') {
      getTypeEvenements(req, res)
    } else {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}