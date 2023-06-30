import React from 'react'
import './App.css'
import {nanoid} from 'nanoid'
import RankingButton from './RankingButton'

export default function App() {

  const [unrankedArray, setUnrankedArray] = React.useState([])
  const [randomziedArray, setRandomziedArray] = React.useState([])
  const [currentPair, setCurrentPair] = React.useState([])
  const [rankedArray, setRankedArray] = React.useState([])
  const [minRange, setMinRange] = React.useState()
  const [maxRange, setMaxRange] = React.useState()


  function handleSubmit(e){
    e.preventDefault()
    const newNameIdea = e.target.nameIdea.value
    setUnrankedArray(oldArray => [...oldArray, newNameIdea])
    document.querySelector('#nameIdea').value = ''
  }

  React.useEffect(() => console.table(unrankedArray), [unrankedArray])
  React.useEffect(() => console.table(randomziedArray), [randomziedArray])
  React.useEffect(() => console.table(rankedArray), [rankedArray])


  function handleNextStep(){
    const copyUnrankedArray = [...unrankedArray]
    const shuffledArray = shuffleArrayOrder(copyUnrankedArray)
    setRandomziedArray(shuffledArray)
    showNextPair()
  }

  function shuffleArrayOrder(array){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // React.useEffect(() => showNextPair(), [])

  const rankingElements = currentPair.map(e => <RankingButton key={e.id} value={e.value} maxRange={e.maxRange} minRange={e.minRange} rankedIndex={e.rankedIndex} handleChoice={() => handleChoice(e.value)}/>)

  function showNextPair(){
    if(rankedArray.length === 0){
      const pair = randomziedArray.slice(0,2)
      let firstPairObjectsArray = []
      for(let i = 0; i < pair.length; i++){
        firstPairObjectsArray.push({
          value: pair[i],
          id: nanoid(),
          maxRange: rankedArray.length,
          minRange: 0
        })
      }
      setCurrentPair(firstPairObjectsArray)
      setRandomziedArray(randomziedArray.slice(2))
      console.log(firstPairObjectsArray)
    } else{
      let pairObjectsArray = []
      console.log(pairObjectsArray)
      let currentlyRanking = {
        value: randomziedArray.pop(),
        id: nanoid(),
        maxRange: rankedArray.length-1,
        minRange: 0
      }
      pairObjectsArray.push(currentlyRanking)
      let rankedItem = {
        id: nanoid(),
        rankedIndex: Math.floor((rankedArray.length-1)/2),
        value: rankedArray[Math.floor((rankedArray.length-1)/2)],
      }
      pairObjectsArray.push(rankedItem)
      setCurrentPair(pairObjectsArray)
      console.log(pairObjectsArray)
  }}

  function handleChoice(choice){
    const chosenOption = currentPair.find(element => element.value === choice);
    const unchosenOption = currentPair.find(element => element.value !== choice);
    if(rankedArray.length === 0){
      setRankedArray([chosenOption, unchosenOption])
      setMinRange(rankedArray.indexOf(chosenOption))
      setMaxRange(rankedArray.indexOf(unchosenOption+1))
    }else{
      showNextPair()
      setUnrankedArray(prevUnrankedArray => prevUnrankedArray.slice(1))
    }
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

      <section className='rankArea'>
        <h2>Rank Names</h2>
        {rankingElements}
      </section>
    </>
  )
}