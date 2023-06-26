import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  function handleSubmit(e){
    e.preventDefault()
    console.log(e.target.nameIdea.value)
    document.querySelector('#nameIdea').value = ''
  }
  
  return (
    <>
      <section className='instructions'>
        <h1>Submit as many name ideas as you can</h1>
        <h2>Three bouts of ten minutes is all you get. Then move on to the next step</h2>
      </section>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="nameIdea">Startup Name:</label>
        <input name='nameIdea' id='nameIdea' type="text" />
        <input type="submit" />
      </form>
      <a href="">Next Step</a>
    </>
  )
}

export default App
