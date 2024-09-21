import { useEffect } from 'react';
import './App.css'
import Grid from './components/Grid';
import { useGameState } from './hooks/useGameState';
import Game from './tools/game';

export const game = new Game(4);

function App() {

  const { state, lastKey } = useGameState(game);

  // const test: number[][] = [
  //   [1, 2, 3, 4],
  //   [5, 6, 7, 8],
  //   [9, 10, 11, 12],
  //   [13, 14, 15, 16],
  // ];
  //
  // const cols = Game.rowsToCols(test);
  // const rows = Game.colsToRows(cols);
  //
  // console.log('Columns:', cols);
  // console.log('Rows:', rows);

  // console.log('')

  // console.table(state);
  // console.log('%cBefore any transformations', 'color: purple; font-size: 18px;')
  // console.table(state);
  // const cols = Game.rowsToCols(state);
  // console.log('%cColumns:', 'color: red; font-size: 18px;')
  // console.table(cols);
  // const rows = Game.colsToRows(cols);
  // console.log('%cRows:', 'color: blue; font-size: 18px;')
  // console.table(rows);
  // console.log('%cDid it mutate something?', 'color: green; font-size: 18px;')
  // console.table(state);


  return (
    <div className='page'>
      <Grid state={state} lastKey={lastKey} />
    </div>
  );

}

export default App;
