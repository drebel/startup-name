import React from 'react'
import './App.css'
import {nanoid} from 'nanoid'
import RankingButton from './RankingButton'

export default function App() {

  const [unrankedArray, setUnrankedArray] = React.useState([])
  const [randomizedArray, setRandomizedArray] = React.useState([])
  const [currentPair, setCurrentPair] = React.useState([])
  const [rankedArray, setRankedArray] = React.useState([])
  const [minRange, setMinRange] = React.useState(0)
  const [maxRange, setMaxRange] = React.useState(1)
  const [newCard, setNewCard] = React.useState(true)

  React.useEffect( () => console.log(unrankedArray), [unrankedArray])
  React.useEffect( () => console.log(randomizedArray), [randomizedArray])
  React.useEffect( () => console.log(currentPair), [currentPair])
  React.useEffect( () => console.log(rankedArray), [rankedArray])
  React.useEffect( () => console.log(minRange, maxRange), [minRange, maxRange])


  React.useEffect( () => {
    if(maxRange === minRange ){
      console.log('step 1a')

      const newRankedArray = [...rankedArray]
      newRankedArray.splice(minRange, 0, currentPair[0].value)
      setRankedArray(newRankedArray)
      setRandomizedArray(prevRandomizedArray => prevRandomizedArray.slice(1))
    }
  }, [minRange, maxRange])

  React.useEffect( () => {
    if(maxRange === minRange && rankedArray.length > 1){
      console.log('step 2')

      setMinRange(0)
      setMaxRange(rankedArray.length)
      const range = rankedArray.length - 0
      const rangeMidpoint = Math.floor(range / 2) + 0
      const newPair = [{
          value: randomizedArray[0],
          id: nanoid()
        },
        {
          value: rankedArray[rangeMidpoint],
          id: nanoid()
        }]
      setCurrentPair(newPair)
      setNewCard(true)
    }
  }, [rankedArray])
  
  React.useEffect( () => {
    if(rankedArray.length > 1 && maxRange !== minRange && !newCard){
      console.log('step 1b')
      const range = maxRange - minRange
      const rangeMidpoint = Math.floor(range / 2) + minRange
      const newPair = [...currentPair]
      newPair[1] = {
        value: rankedArray[rangeMidpoint],
        id: nanoid()
      }
      setCurrentPair(newPair)
    }
  }, [maxRange, minRange])


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
    setRankedArray([randomizedArray[0]])
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
      handleChoice={() => handleChoice(e.id)}
    />
  })

  function handleChoice(id){
    setNewCard(false)
    const choice = currentPair.find(e => e.id === id)
    const notChoice = currentPair.find(e => e.id !== id)
    // console.log(typeof rankedArray)
    const isChoiceAlreadyRanked = rankedArray.some(e => e === choice.value)
    
    if(isChoiceAlreadyRanked){
      setMinRange(rankedArray.indexOf(choice.value) + 1)
    }else{
      setMaxRange(rankedArray.indexOf(notChoice.value))
    }
    // if(maxRange === minRange ){
    //   const newRankedArray = [...rankedArray]
    //   newRankedArray.splice(minRange, 0, choice.value)
    //   setRankedArray(newRankedArray)
    //   setRandomizedArray(prevRandomizedArray => prevRandomizedArray.slice(1))
      
    // }
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
      <section>
        <button onClick={handleRandomize}>Randomize Order</button>
        <button onClick={handleSetRankedArray}>Set ranked Array</button>
        <button onClick={handleShowFirstCard}>Show First Cards</button>
      </section>
      <section>
        <h2>Select preferred option</h2>
        {rankingElements}
      </section>
    </>
  )
}