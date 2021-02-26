import React, { useState, useEffect, useRef } from 'react';
import './assets/main.css';
import Break from './components/Break';
import Session from './components/Session';
import TimeLeft from './components/TimeLeft';

const App = () => {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [currentSessionType, setCurrentSessionType] = useState('Session'); // 'Session' or 'Break'
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(300);
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  // change timeLeft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  // listen to timeLeft changes
  useEffect(() => {
    // if timeLeft is zero
    if (timeLeft === 0) {
      // play the audio
      audioElement?.current?.play(); // optional chaining
      // change session to break or break to session
      if (currentSessionType === 'Session') {
        setCurrentSessionType('Break');
        setTimeLeft(breakLength);
      } else if (currentSessionType === 'Break') {
        setCurrentSessionType('Session');
        setTimeLeft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeLeft]);

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength);
    }
  };

  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength);
    }
  };

  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(sessionLength + 60);
    }
  };

  const isStarted = intervalId !== null;
  const handleStartStopClick = () => {
    if (isStarted) {
      // if we are in started mode:
      // we want to stop the timer
      // clearInterval
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    } else {
      // if we are in stopped mode:
      // decrement timeLeft by one every second (1000 ms)
      // to do this we'll use setInterval
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      }, 100); // TODO: turn back into 1000
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    // reset audio
    audioElement?.current?.load();
    // clear the timeout interval
    if (intervalId) {
      clearInterval(intervalId);
    }
    // set the intervalId null
    setIntervalId(null);
    // set the sessiontype to 'Session'
    setCurrentSessionType('Session');
    // reset the session length to 25 minutes
    setSessionLength(60 * 25);
    // reset the break length to 5 minutes
    setBreakLength(60 * 5);
    // reset the timer to 25 minutes (initial session length)
    setTimeLeft(60 * 25);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-green-700">
      <div className="flex w-full justify-around">
        <Break
          breakLength={breakLength}
          decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
          incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
        />
        <TimeLeft
          handleResetButtonClick={handleResetButtonClick}
          handleStartStopClick={handleStartStopClick}
          timerLabel={currentSessionType}
          startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
          timeLeft={timeLeft}
        />
        <Session
          sessionLength={sessionLength}
          decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
          incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
        />
      </div>
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default App;














// import React from 'react';
// import { TextField } from './TextField';
// import { Counter } from './Counter';


// type Props = {
//   startTimeInSeconds: number;
// }

// type State = {
//   timeRemainingInSeconds: number;
// }


// export default class App extends React.Component {
//   private timer: any;

//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       timeRemainingInSeconds: props.startTimeInSeconds
//     };
//   }

//   decrementTimeRemaining = () => {
//     if (this.state.timeRemainingInSeconds > 0) {
//       this.setState({
//         timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
//       });
//     } else {
//       clearInterval(this.timer!);
//     }
//   };

//   componentDidMount() {
//     this.timer = setInterval(() => {
//       this.decrementTimeRemaining();
//     }, 1000);
//   }

//   render() {
//     return (
//       <div className="countdown-timer">
//         <div className="countdown-timer__circle">
//           <svg>
//             <circle
//               r="24"
//               cx="26"
//               cy="26"
//               style={{
//                 animation: `countdown-animation ${this.props
//                   .startTimeInSeconds}s linear`
//               }}
//             />
//           </svg>
//         </div>
//         <div className="countdown-timer__text">
//           {this.state.timeRemainingInSeconds}s
//         </div>
//       </div>
//     );
//   }
// }








// // props
// // hooks
// // render props
// interface checkCount {
//   check: (count: number, setCount: () => null, event: React.ChangeEvent<HTMLInputElement>) => {
//   // check: (count: number, setCount: ()) => {
//     if (count: number) {
//       return (
//         setCount(count - 1);
//       )
//       // return null;
//     } else {
//       alert("you don't have enough badges to train me!")
//     }
//   };
// }

// const App: React.FC<checkCount> = ({check}) => {
//   return (
//     <div>
//       <Counter>
//         {(count, setCount) => (
//           <div>
//             <button onClick={() => check(count, setCount)}>-</button>
//             {count}
//             <button onClick={() => setCount(count + 1)}>+</button>
//           </div>
//         )}
//       </Counter>
//     </div>
//   )
// }

// export default App;


// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
