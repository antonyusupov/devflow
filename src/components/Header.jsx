import React from 'react'


function Header({name = "Developer", role = "Not Selected"}) {

  return (
    <div>
      <h1 className ="text-3xl font-bold text-white">Welcome back, { name }!</h1>
      <p className="text-slate-400 mt-2">{role}</p>
      <p className="text-violet-600 mt-2">Lets make some progress today.</p>
    </div>
  )
}

export default Header
