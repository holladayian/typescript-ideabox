import React from 'react';
import { TextField } from './TextField';
import { Counter } from './Counter';

// props
// hooks
// render props

const App: React.FC = () => {
  return <div>
    <Counter>
      {(count, setCount) => (
        <div>
          {count}
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      )}
    </Counter>
    {/* <TextField text='hello' person={{firstName: '', lastName: ''}}
    // handleChange={e => {
    //   e.
    // }}
    /> */}
  </div>
}

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
