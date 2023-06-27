import React from 'react'
import './App.css'

function App() {

  const [unrankedArray, setUnrankedArray] = React.useState([])

  function handleSubmit(e){
    e.preventDefault()
    const newNameIdea = e.target.nameIdea.value
    setUnrankedArray(oldArray => [...oldArray, newNameIdea])
    document.querySelector('#nameIdea').value = ''
  }

  React.useEffect(() => console.table(unrankedArray))

  
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
