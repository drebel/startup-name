
export default function RankingButton(props){
    // console.log(props)
    // if(props.maxRange != undefined && props.minRange !=undefined){
    //     return(
    //         <button id={props.id} onClick={props.handleChoice} data-minIndex={props.minRange} data-maxIndex={props.maxRange} data-rankedIndex={props.rankedIndex}>{props.value}</button>
    //     )
    // }else if(props.rankedIndex){
    //     return(
    //         <button id={props.id} onClick={props.handleChoice} data-rankedIndex={props.rankedIndex}>{props.value}</button>
    //     )
    // }else{
    //     return(
    //         <button id={props.id} onClick={props.handleChoice}>error</button>
    //     ) 
    // }

    return(
        <button id={props.id} onClick={props.handleChoice} >{props.value}</button>
    )

}