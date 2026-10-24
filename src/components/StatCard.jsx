import React from 'react'

const StatCard = ({title, value}) => {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <h2 className="text-sm text-slate-400">{title}</h2>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

export default StatCard
