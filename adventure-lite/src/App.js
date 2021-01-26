"use strict";
import red from './red.png';
import green from './green.png';
import white from './white.png';
import grey from './grey.png';
import './App.css';
const {useState} = require("react");
const  useInterval = require("./useInterval");

const axios = require('axios');

axios.get('http://localhost:3001/landscape')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

const FIELD_SIZE = 16;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];


let randItem = {
  x: Math.floor(Math.random() * FIELD_SIZE),
  y: Math.floor(Math.random() * FIELD_SIZE)
}

const  DIRECTION = {
  39: {x: 1, y: 0},
  37: {x: -1, y: 0},
  38: {x: 0, y: -1},
  40: {x: 0, y: 1},
}

function getItem(x,y,personSegments) {
  if(randItem.x === x && randItem.y === y){
    return green
  }

  for (const  segment of personSegments){
    if (segment.x === x && segment.y === y){
      return red
    }
  }
}

function limitByField(j) {
  if(j >= FIELD_SIZE){
    return 0;
  }
  if(j < 0){
    return  FIELD_SIZE - 1;
  }
 return j;
}

function newPersonPosition(segments, direction) {
  return segments.map(segment => ({
    x:limitByField(segment.x + direction.x),
    y:limitByField(segment.y + direction.y)
  }));
}

function App() {



  const [personSegments,setPersonSegments] = useState([
    {x:8,y:8}
  ]);


  const [direction, setDirection] = useState(DIRECTION["37"]);

  const movePerson = ({keyCode}) =>
      keyCode >= 37 && keyCode <= 40 && setPersonSegments(segments => newPersonPosition(segments, DIRECTION[keyCode]));

  return (
<div role="button" tabIndex="0" onKeyDown={e => movePerson(e)} >
  <p >Adventure-lite</p>
    <div id="gor">
      <div id="vert">
        {FIELD_ROW.map(y =>(
            <div class="sqrow" key={y}>
              {FIELD_ROW.map(x => (
                  <img class="sq" key={x} src={getItem(x,y,personSegments) || grey}/>
              ))}
            </div>
        ))}
      </div>
    </div>
</div>
  );
}

export default App;
