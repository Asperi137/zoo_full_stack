import type { NextApiRequest, NextApiResponse } from 'next'
import {animaux as data} from '../../../data/animaux'
import { Animaux } from '../../../Types/Animaux'

type ResponseError = {
  message: string
}

export default function Handler(  req: NextApiRequest,  res: NextApiResponse<Animaux | ResponseError>) {
  const { query, method } = req
  const { id } = query
  const filtered = data.filter((p) => p._id === id)

  if (filtered.length > 0){
  switch (method) {
    case 'GET':
      res.status(200).json(filtered[0])
      break
    case 'PUT':
      res.status(200).json({message : "put"})
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }}else
  { res.status(404).json({ message: `animal with id: ${id} not found.` })}
}