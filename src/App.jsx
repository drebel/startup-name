import React from 'react'
import './App.css'
import {nanoid} from 'nanoid'
import RankingButton from './RankingButton'

export default function App() {

  const [unrankedArray, setUnrankedArray] = React.useState([])
  const [randomizedArray, setRandomizedArray] = React.useState()

  React.useEffect( () => console.log(randomizedArray), [randomizedArray])


  function handleIdeaSubmit(e){
    e.preventDefault()
    const idea = e.target.nameIdea.value
    setUnrankedArray(prevUnrankedArray => {
      return [...prevUnrankedArray, idea]
    })
    document.querySelector('#nameIdea').value = ''
  }

  function randomizeList(){
    const copyUnrankedArray = [...unrankedArray]
    const shuffledArray = shuffleArrayOrder(copyUnrankedArray)
    setRandomizedArray([...shuffledArray])
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
      <form onSubmit={handleIdeaSubmit}> 
        <input name='nameIdea' id='nameIdea' type="text" placeholder='Name Idea' />
        <button type="submit" >Submit!</button>
      </form>
      <button onClick={randomizeList}>Randomize Order</button>
    </>
  )
}