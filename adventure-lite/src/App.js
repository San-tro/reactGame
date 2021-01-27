"use strict";
import red from './red.png';
import green from './green.png';
import white from './white.png';
import grey from './grey.png';
import './App.css';


const {useState} = require("react");
const  useInterval = require("./useInterval");

const axios = require('axios');

function testbd(){// переделать под игрульку

axios.get('http://localhost:3001/landscape')// пример получения
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    axios.post(`http://localhost:3001/leaderbord/add`,{// пример добавления
        Name: '',
        Time: '',
        Score: '',
        }
    );
}

const FIELD_SIZE = 17;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];

var maps;

function getMap(){
  axios.get('http://localhost:3001/landscape')// пример получения
      .then(function (response) {
        // handle success
        maps = response;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

getMap();

/*const textureMap1x = [0,1,2,3,4,5,6,0,1,2,3,4,5,0,1,2,3,4,0,1,2,3,0,1,2,0,1,0,10,11,12,13,14,15,16,11,12,13,14,15,16,12,13,14,15,16,13,14,15,16,14,15,16,15,16,16,
  0 ,1 ,2 ,3 ,4 ,5 ,6 ,0 ,1 ,2 ,3 ,4 ,5 ,0 ,1 ,2 ,3 ,4 ,0 ,1 ,2 ,3 ,0 ,1 ,2 ,0 ,1 ,0 ,10,11,12,13,14,15,16,11,12,13,14,15,16,12,13,14,15,16,13,14,15,16,14,15,16,15,16,16];
const textureMap1y = [0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,4,4,4,5,5,6,0 ,0 ,0 ,0 ,0 ,0 ,0 , 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6,
  16,16,16,16,16,16,16,15,15,15,15,15,15,14,14,14,14,14,13,13,13,13,12,12,12,11,11,10,16,16,16,16,16,16,16,15,15,15,15,15,15,14,14,14,14,14,13,13,13,13,12,12,12,11,11,10];*/




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

function getItem(x,y,personSegments, x1, y1) {
  if(randItem.x === x && randItem.y === y){
    return green
  }

  for(let i = 0; i< x1.length; i++){
    if(x1[i] === x && y1[i] === y){
      return white
    }
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
  if(j < 0) {
    return FIELD_SIZE - 1;
  }
 return j;
}

function newPersonPosition(segments, direction,xMap,yMap) {
  let go = true;
  let x1 = segments[0].x + direction.x;
  let y1 = segments[0].y + direction.y;
  for(let i = 0; i< xMap.length; i++) {
    if (x1 == xMap[i] && y1 == yMap[i]) {
      go = false
    }
  }
  if(go){
    return segments.map(segment => ({
      x: limitByField(segment.x + direction.x),
      y: limitByField(segment.y + direction.y)
    }));
    }
  else {
    return segments.map(segment => ({
      x: limitByField(segment.x),
      y: limitByField(segment.y)
    }));
  }

}

function App() {
  const [personSegments,setPersonSegments] = useState([
    {x:8,y:8}
  ]);

  const movePerson = ({keyCode}) =>
      keyCode >= 37 && keyCode <= 40 && setPersonSegments(segments => newPersonPosition(segments, DIRECTION[keyCode], maps[0].x,maps[0].y));

  return (
<div role="button" tabIndex="0" onKeyDown={e => movePerson(e)} >
  <p >Adventure-lite</p>
    <div id="gor">
      <div id="vert">
        {FIELD_ROW.map(y =>(
            <div class="sqrow" key={y}>
              {FIELD_ROW.map(x => (
                  <img class="sq" key={x} src={getItem(x,y,personSegments, maps[0].x ,maps[0].y) || grey}/>
              ))}
            </div>
        ))}
      </div>
    </div>
</div>
  );
}

export default App;
