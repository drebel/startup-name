import React from 'react'
import './App.css'

function App() {

  const [unrankedArray, setUnrankedArray] = React.useState([])
  const [randomziedArray, setRandomziedArray] = React.useState()


  function handleSubmit(e){
    e.preventDefault()
    const newNameIdea = e.target.nameIdea.value
    setUnrankedArray(oldArray => [...oldArray, newNameIdea])
    document.querySelector('#nameIdea').value = ''
  }

  React.useEffect(() => console.table(unrankedArray))
  React.useEffect(() => console.table(randomziedArray))

  function handleNextStep(){
    const copyUnrankedArray = [...unrankedArray]
    const shuffledArray = shuffleArrayOrder(copyUnrankedArray)
    setRandomziedArray(() => [...shuffledArray])
  }

  function shuffleArrayOrder(array){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
      <button onClick={handleNextStep}>Next Step!</button>
    </>
  )
}

export default App
