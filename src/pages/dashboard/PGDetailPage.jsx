import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PGDetailsView from '../../components/discovery/PGDetailsView'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'

export default function PGDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const pg = EXPANDED_PGS.find((p) => p.id === id) || EXPANDED_PGS[0]

  return <PGDetailsView pg={pg} onClose={() => navigate('/dashboard/search')} />
}
