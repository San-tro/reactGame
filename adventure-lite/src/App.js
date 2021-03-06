"use strict";
import red from './images/red.png';
import green from './images/green.png';
import white from './images/white.png';
import grey from './images/grey.png';
import './App.css';
import React from 'react';
import {useAlert} from 'react-alert'


const {useState} = require("react");// нужно для объявления переменных кторые будут сохранятся между рендерами ХУКИ
const useInterval = require("./useInterval");// не используется
const axios = require('axios');

var level = 0;
let game_over = false;
let FIELD_SIZE = 19;//карта
let FIELD_ROW = [...new Array(FIELD_SIZE).keys()];//карта

const textureMap1x = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2, 0, 1, 0, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 10, 11, 12, 13, 14, 15, 16, 17, 18, 11, 12, 13, 14, 15, 16, 17, 18, 12, 13, 14, 15, 16, 17, 18, 13, 14, 15, 16, 17, 18, 14, 15, 16, 17, 18, 15, 16, 17, 18, 16, 17, 18, 17, 18, 18, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2, 0, 1, 0, 11, 12, 13, 14, 15, 16, 17, 18, 12, 13, 14, 15, 16, 17, 18, 13, 14, 15, 16, 17, 18, 14, 15, 16, 17, 18, 15, 16, 17, 18, 16, 17, 18, 17, 18, 18];
const textureMap1y = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 8, 8, 9, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 15, 15, 14, 14, 14, 14, 14, 14, 13, 13, 13, 13, 13, 12, 12, 12, 12, 11, 11, 11, 10, 10, 9, 18, 18, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 16, 16, 16, 16, 16, 16, 15, 15, 15, 15, 15, 14, 14, 14, 14, 13, 13, 13, 12, 12, 11];

const textureMap2x = [4, 8, 11, 12, 14, 14, 2, 4, 6, 7, 8, 10, 14, 16, 2, 4, 12, 14, 16, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 2, 4, 5, 12, 14, 16, 2, 7, 9, 11, 12, 14, 16, 2, 3, 4, 5, 9, 16, 5, 7, 8, 9, 10, 12, 13, 14, 16, 1, 3, 5, 6, 7, 10, 11, 12, 16, 1, 3, 5, 6, 7, 10, 11, 14, 15, 16, 7, 8, 10, 11, 13, 14, 16, 1, 2, 3, 4, 5, 10, 11, 13, 14, 16, 6, 7, 8, 14, 16, 1, 2, 3, 9, 10, 11, 12, 13, 14, 16, 5, 7, 9, 10, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 16, 17, 7, 16, 17, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const textureMap2y = [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18];

const textureMap3x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3, 10, 15, 16, 1, 5, 6, 7, 8, 9, 10, 12, 13, 15, 1, 3, 13, 15, 16, 1, 3, 4, 6, 7, 8, 9, 11, 13, 1, 4, 5, 6, 9, 10, 11, 13, 15, 16, 1, 4, 12, 13, 16, 1, 3, 4, 6, 7, 8, 9, 10, 12, 13, 15, 16, 1, 7, 10, 13, 14, 1, 3, 4, 5, 6, 7, 10, 11, 14, 16, 1, 3, 7, 9, 10, 11, 13, 1, 5, 6, 7, 11, 13, 15, 16, 17, 1, 2, 3, 4, 5, 9, 13, 16, 1, 7, 8, 9, 11, 12, 13, 14, 3, 4, 5, 7, 8, 9, 11, 14, 16, 17, 2, 3, 9, 11, 12, 17, 5, 7, 11, 14, 16, 17, 2, 3, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17];
const textureMap3y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17];

const textureMap4x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 18, 0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 16, 1, 11, 12, 13, 16, 4, 7, 9, 11, 13, 15, 16, 2, 4, 5, 7, 9, 10, 11, 13, 2, 4, 6, 7, 15, 16, 17, 2, 6, 8, 9, 10, 11, 12, 14, 15, 17, 2, 3, 5, 6, 9, 12, 14, 3, 6, 8, 9, 12, 14, 16, 17, 1, 3, 6, 9, 11, 12, 14, 1, 3, 4, 6, 8, 9, 11, 14, 17, 1, 2, 3, 6, 11, 17, 1, 5, 6, 7, 8, 9, 11, 13, 14, 17, 1, 2, 5, 9, 15, 16, 17, 1, 2, 3, 5, 7, 9, 10, 11, 13, 14, 1, 5, 7, 9, 12, 13, 16, 1, 3, 5, 7, 9, 11, 12, 15, 16, 1, 2, 3, 7, 14, 15];
const textureMap4y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17];

const lolFishX = [[-1], [true]];
const lolFishXY = [-1];

const firstFishX = [[9], [true]];
const firstFishXY = [9];

const secondFishX = [[9], [true]];
const secondFishXY = [8];

const thirdFishX = [[11], [true]];
const thirdFishY = [7];

let fishCount = 0;

const allFishX = [lolFishX, firstFishX, secondFishX, thirdFishX];
const allFishY = [lolFishXY, firstFishXY, secondFishXY, thirdFishY];

let allMapX = [textureMap1x, textureMap2x, textureMap3x, textureMap4x];
let allMapY = [textureMap1y, textureMap2y, textureMap3y, textureMap4y];

allMapX[0].push(18);
allMapY[0].push(10);
//allMapX[0].pop();
//allMapY[0].pop();

const DIRECTION = { // идентификация кнопок управления
    39: {x: 1, y: 0},
    37: {x: -1, y: 0},
    38: {x: 0, y: -1},
    40: {x: 0, y: 1},
};

function getItem(x, y, personSegments, x1, y1, fishX, fishY) {//  отрисовка уровня в первый раз
    if (fishX[0] == x && fishY == y && fishX[1]) {// отрисовка предмета
        return green
    }
    for (let i = 0; i < x1.length; i++) {//отрисовка текстур (стен)
        if (x1[i] === x && y1[i] === y) {
            return white
        }
    }
    for (const segment of personSegments) {// отрисовка игрока
        if (segment.x === x && segment.y === y) {
            return red
        } else if (segment.x == fishX[0] && segment.y == fishY[0] && fishX[1]) {
            allFishX[level][1] = false;
            fishCount++;
        }
    }
    if (fishCount == 3) {
        console.log("Win");
    }
}

function limitByField(j) {// ограничение по полю
    if (j >= FIELD_SIZE) {
        return 0;
    }
    if (j < 0) {
        return FIELD_SIZE - 1;
    }
    return j;
}

function newPersonPosition(segments, direction, xMap, yMap, GO) { // перемещение игрока
    if (!GO) {
        let go = true;
        let x1 = segments[0].x + direction.x;
        let y1 = segments[0].y + direction.y;
        for (let i = 0; i < xMap.length; i++) {
            if (x1 == xMap[i] && y1 == yMap[i]) {// проверка на столкновение с текстурой
                go = false
            }
        }
        if (go) { // задание нового положения
            if (level == 0) {
                if (x1 == -1 && y1 == 8)
                    level = 2;
                else if (x1 == 8 && y1 == -1) {
                    level = 3;
                } else if (x1 == 10 && y1 == 19) {
                    level = 1;
                }
            } else if (level == 2) {
                if (x1 == 19 && y1 == 8) {
                    level = 0;
                }
            } else if (level == 1) {
                if (x1 == 10 && y1 == -1)
                    level = 0;
            } else if (level == 3) {
                if (x1 == 8 && y1 == 19)
                    level = 0;
            }

            return segments.map(segment => ({
                x: limitByField(x1),
                y: limitByField(y1)
            }));

        } else {
            return segments.map(segment => ({
                x: limitByField(segment.x),
                y: limitByField(segment.y)
            }));
        }
    } else {
        return segments.map(segment => ({
            x: limitByField(segment.x),
            y: limitByField(segment.y)
        }));
    }
}

///ТАЙМЕР
var now = new Date();

///
function App() {
    const [personSegments, setPersonSegments] = useState([// значения переменных сохраняются между рендерингами
        {x: 9, y: 9}
    ]);

    const movePerson = ({keyCode}) =>
        !game_over && keyCode >= 37 && keyCode <= 40 && setPersonSegments(segments => newPersonPosition(segments, DIRECTION[keyCode], allMapX[level], allMapY[level], game_over));

    const alert = useAlert();
    if (fishCount == 3) {
        game_over = true;
        var dateend = new Date();
        var scoreTime = new Date(dateend.getTime() - now.getTime());
        alert.show('Победа! Ваше время: ' + "минут: " + scoreTime.getMinutes() + " секунд: " + scoreTime.getSeconds())
        axios.post(`http://localhost:3001/leaderbord/add`, {
                Name: "player1",
                Time: "минут: " + scoreTime.getMinutes() + " секунд: " + scoreTime.getSeconds(),
                Score: "100 очков Гриффиндору!"
            }
        );
    }

    return (
        <div role="button" tabIndex="0" onKeyDown={e => movePerson(e)}>
            <p>Adventure-lite</p>
            <div id="gor">
                <div id="vert">
                    {FIELD_ROW.map(y => (
                        <div class="sqrow" key={y}>
                            {FIELD_ROW.map(x => (
                                <img class="sq" key={x}
                                     src={getItem(x, y, personSegments, allMapX[level], allMapY[level], allFishX[level], allFishY[level]) || grey}/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;