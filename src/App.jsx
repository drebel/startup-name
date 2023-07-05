import React from 'react'
import './App.css'
import {nanoid} from 'nanoid'
import RankingButton from './RankingButton'

export default function App() {

  const [unrankedArray, setUnrankedArray] = React.useState([])
  const [randomizedArray, setRandomizedArray] = React.useState([])
  const [currentPair, setCurrentPair] = React.useState([])
  const [rankedArray, setRankedArray] = React.useState([])

  React.useEffect( () => console.log(unrankedArray), [unrankedArray])
  React.useEffect( () => console.log(randomizedArray), [randomizedArray])
  React.useEffect( () => console.log(currentPair), [currentPair])
  React.useEffect( () => console.log(rankedArray), [rankedArray])


  function handleIdeaSubmit(e){
    e.preventDefault()
    const idea = e.target.nameIdea.value
    setUnrankedArray(prevUnrankedArray => {
      return [...prevUnrankedArray, idea]
    })
    document.querySelector('#nameIdea').value = ''
  }

  function handleRandomize(){
    setRandomizedArray(randomizeList(unrankedArray))
    // setRankedArray(randomizedArray[0])
  }

  function randomizeList(array){
    const copyUnrankedArray = [...array]
    const shuffledArray = shuffleArrayOrder(copyUnrankedArray)
    return shuffledArray
    // setRandomizedArray([...shuffledArray])
  }

  function shuffleArrayOrder(array){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleSetRankedArray(){
    setRankedArray(randomizedArray[0])
    setRandomizedArray(prevRandomizedArray => prevRandomizedArray.slice(1))

  }

  function handleShowFirstCard(){
    setCurrentPair([
      {
        value: randomizedArray[0],
        id: nanoid()
      },
      {
        value: rankedArray[0],
        id: nanoid()
      }
    ])
  }


  const rankingElements = currentPair.map(e => {
    return <RankingButton 
      value={e.value}
      key={e.id}
    />
  })


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
      <button onClick={handleRandomize}>Randomize Order</button>
      <button onClick={handleSetRankedArray}>Set ranked Array</button>
      <button onClick={handleShowFirstCard}>Show First Cards</button>
      {rankingElements}
    </>
  )
}