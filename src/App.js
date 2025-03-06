import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import './App.css';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const tests = [
  "Твоя харизма и энергия освещают всё вокруг! Пусть этот день принесёт тебе столько же радости, сколько ты даришь людям! 💖",
  "Твоя доброта и нежность делают мир прекраснее! Пусть 8 Марта принесёт тебе счастье, улыбки и весеннее тепло! 🌷",
  "Ты, как весенний цветок – нежная, красивая и лучистая! Пусть 8 Марта принесёт тебе только приятные эмоции! 💐",
  "Твой блеск в глазах и невероятный характер вдохновляют! Пусть в этот день всё складывается так, как ты мечтаешь! ✨",
  "Твоя улыбка освещает всё вокруг, а душевная теплота делает этот мир добрее! Пусть 8 Марта подарит тебе море радости и ярких впечатлений! ✨",
  "Ты – воплощение нежности и силы одновременно! Пусть этот день принесёт тебе только счастье, любовь и весеннее вдохновение! 💖",
  "В тебе сочетаются мудрость, красота и невероятное обаяние! Пусть этот день будет наполнен тёплыми словами, комплиментами и самыми приятными моментами! 💐",
  "Ты, как солнечный лучик, согреваешь всех вокруг! Пусть 8 Марта принесёт тебе море радости, улыбок и приятных сюрпризов! ☀️",
  "В тебе есть особенный свет, который притягивает людей! Пусть этот день подарит тебе чудесное настроение, комплименты и только счастливые моменты! 🌷",
  "Ты очаровательна, мудра и невероятно харизматична! Пусть этот день наполнится радостью, весенним теплом и особенным вниманием! 🌹",
  "Твоя внутренняя сила и обаяние не оставляют никого равнодушным! Пусть 8 Марта станет для тебя ярким, солнечным и незабываемым! ✨",
  "Ты уникальна, ярка и неповторима! Пусть этот день принесёт тебе самые тёплые эмоции, чудесные моменты и заслуженные комплименты! 💖",
]

function App() {

  const gameTime = 10

  const [arrayImages, setArrayImages] = useState([]);
  const [selectedFlovers, setSelectedFlovers] = useState([]);
  const [time, setTime] = useState(gameTime);
  const [showPopup, setShowPopup] = useState(true);
  const [textId, setTextId] = useState(0);

  function selectFlower(key) {
    setSelectedFlovers(prevArray => [...prevArray, key])
  }

  function closeModal() {
    setShowPopup(false);
    setTime(gameTime);
    setSelectedFlovers([]);
    setTextId(getRndInteger(0,12))
  }

  useEffect(() => {
    let newArray = [];
    for (let i = 0; i < 50; i++) {
      newArray.push(getRndInteger(1,7))
    }
    setArrayImages(newArray);
    setTextId(getRndInteger(0,12))
  }, []);

  useEffect(() => {
    if (time > 0 && !showPopup) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setShowPopup(true);
    }
  }, [time, showPopup]);

  return (
    <div className="App">
      <div className="App-header">
        <p className='App-header-main'>Собери весенний букет</p>
        <p>Осталось <span>{time}</span> сек.</p>
      </div>
      <div className="App-body">
        {
          arrayImages.map((val, key)=>{
            return (
              <div className={`App-flower App-flower-${val} ${selectedFlovers.includes(key)? "App-flower-selected":""}`} key={key} onClick={() => selectFlower(key)}>
              </div>
            )
          })
        }
      <Popup open={showPopup} onClose={closeModal} closeOnDocumentClick={false} closeOnEscape={false}>
        { time > 0 ? (
          <div className="App-result">
          <p className='App-result-text'>
            Тебе предстоит собрать самый большой букет за ограниченное время.
          </p>
          <p className='App-result-button' onClick={closeModal}>[СТАРТ]</p>
         </div>
        ) :
        (
        <div className="App-result">
          <p>Твой результат: {selectedFlovers.length}</p>
          <p className='App-result-text'>{tests[textId]}</p>
          <p className='App-result-button' onClick={closeModal}>[ЕЩЕ РАЗ]</p>
        </div>
        )
        }
      </Popup>
      </div>
    </div>
  );
}

export default App;
