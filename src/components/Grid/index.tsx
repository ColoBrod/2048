import style from './style.module.css';

// React
import { motion, AnimatePresence } from "framer-motion";

import { game } from '../../App';
import { ReactNode } from 'react';

interface GridProps {
  state: GameState;
  lastKey: ControlKey;
}

const Grid = ({ state, lastKey }: GridProps) => {
  const { merges } = game;
  return (
    <div className={style.grid}>
      {
        state.map((row, y) => row.map((cell, x) => (
          <div key={`cell-${x}:${y}`} className={style.cell} /> 
        )))
      }
      <AnimatePresence custom={{ lastKey, merges, state }}>
        { renderBlocks() }
      </AnimatePresence>
    </div>
  );

  function renderBlocks(): ReactNode {
    return state.flat().map((block, i, blocks) => {
      if (block === null) return null;

      const x = i % state.length;
      const y = Math.floor(i / state.length);
      
      const variants = {
        exit: ({ key, merges, state }
        : {
          key: ControlKey;
          merges: Map<string, string>;
          state: GameState;
        }) => {
          const mergedWithUuid = merges.get(block.uuid);
          const mergedWithIndex = blocks.findIndex(bl => bl?.uuid === mergedWithUuid);
          const mergedWith = blocks[mergedWithIndex];

          if (mergedWithIndex === -1) return ({
            opacity: 0,
          });
          const mergedWithX = mergedWithIndex % state.length;
          const mergedWithY = Math.floor(mergedWithIndex / state.length);
          console.log(block.uuid);
          console.log(mergedWith);
          console.log(mergedWithY, mergedWithY);
          return ({
            zIndex: 1,
            left: `${25*mergedWithX}%`,
            top: `${25*mergedWithY}%`,
            opacity: 0,
          });
        }
      }

      // let prevX: number, prevY: number;
      // if (lastKey === 'ArrowLeft') {
      //   prevX = x - 1;
      //   prevY = y;
      // }
      // else if (lastKey === 'ArrowRight') {
      //   prevX = x + 1;
      //   prevY = y;
      // }
      // else if (lastKey === 'ArrowUp') {
      //   prevX = x;
      //   prevY = y - 1;
      // }
      // else {
      //   prevX = x;
      //   prevY = y + 1;
      // }

      // let mergedWithId: string = merges.get(block.uuid);
      // console.log(mergedWithId);
      // console.log('Merges from GRID:');
      // console.log(game.merges);
      // const mergedWithId = game.merges.get(block.uuid);
      // if (mergedWithId) console.log(mergedWithId);

      // let dir: 'left' | 'right' | 'top' | 'bottom';
      // if (lastKey === 'ArrowLeft') dir = 'left';
      // else if (lastKey === 'ArrowRight') dir = 'right';
      // else if (lastKey === 'ArrowDown') dir = 'bottom';
      // else if (lastKey === 'ArrowUp') dir = 'top';

      // const variants = {
      //   exitLeft: {
      //     zIndex: 1,
      //     left: 0,
      //     top: `${25*y}%`,
      //   },
      //   exitRight: {
      //     zIndex: 1,
      //     right: 0,
      //     top: `${25*y}%`,
      //   },
      //   exitTop: {
      //     zIndex: 1,
      //     left: `${25*x}%`,
      //     top: 0,
      //   },
      //   exitBottom: {
      //     zIndex: 1,
      //     left: `${25*x}%`,
      //     bottom: 0,
      //   },
      // };
      // console.log('Last key: ',lastKey);

      // if ([...merges.values()].)
      const wasMerged = [...merges.values()].indexOf(block.uuid) !== -1

      return (
        <motion.div 
          key={block.uuid} 
          className={`block block__${block.value.toString()}`}
          variants={variants}
          initial={{
            scale: 0,
            left: `${25*x}%`,
            top: `${25*y}%`,
          }}
          animate={{
            scale: 1,
            left: `${25*x}%`,
            top: `${25*y}%`,
            scale: wasMerged ? [1.2, 1] : 1,
          }}
          exit={"exit"}
          // exit={{
          //   opacity: 0,
          //   // left: `${25*prevX}%`,
          //   // top: `${25*prevY}%`,
          // }}
          // exit={
          //   lastKey === 'ArrowLeft' 
          //     ? 'exitLeft' 
          //     : lastKey === 'ArrowRight'
          //       ? 'exitRight'
          //       : lastKey === 'ArrowUp'
          //         ? 'exitTop'
          //         : 'exitBottom'
          // }
          // variants={variants}
          // exit={lastKey === 'ArrowLeft' ? 'exitLeft' : 'exitRight'}
        >
          <span className='block__value'>{block.value.toString()}</span>
          <span className='block__uuid'>{block.uuid.slice(-5)}</span>
        </motion.div> 
      );
    });
  }
};

export default Grid;    
