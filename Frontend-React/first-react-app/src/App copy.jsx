
import './App.css';

function App() {
  const element = <h1>this is heading </h1>
  const mylist = (
    <ul>
      <li>list one</li>
      <li>list two </li>
      <li> kist 3</li>
    </ul>
  );
 
  return (
    <div className="App">
     <h1 className='heading'> welcome to our app </h1>
    <div>
      <p>JSX</p> 
      <div> my age : { 10 + 20 }</div>
      <hr />
      {element}
    </div>
    <b>{mylist}</b>r
    <hr />
    <br />
    </div>
  );
}

export default App;
