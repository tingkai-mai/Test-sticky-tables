import { useState } from 'react';
import './App.css'
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

function App() {
  const [grid, setGrid] = useState([
    [{ value: 1, customRenderer: true }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }],
    [{ value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }],
    [{ value: 13 }, { value: 14 }, { value: 15 }, { value: 16 }, { value: 17 }, { value: 18 }],
  ]);

  const gridColorStyle = {
    border: '1px solid black'
  };

  const cellStyle = {
    ...gridColorStyle,  // Apply the grid color style
    minWidth: '200px' // Add your other styles here
  };

  const CustomCell = ({ cell, ...props }) => (
    <td style={{ backgroundColor: 'lightblue', ...cellStyle }}>
      {props.children}
    </td>
  );

  return (
    <div style={{
      width: "600px",
      maxWidth: "600px",
      overflow: "scroll"
    }}>
      <ReactDataSheet
        data={grid}
        valueRenderer={(cell) => cell.value}
        rowRenderer={(props) => <tr style={{
        }}>{props.children}</tr>}
        cellRenderer={(props) => {
          // Check if it's the first column
          if (props.col === 0) {
            return (
              <td
                {...props}
                style={{
                  ...cellStyle,
                  color: "white",
                  textAlign: "center",
                  position: 'sticky', // impt
                  left: 0, // impt
                  backgroundColor: 'grey',
                  zIndex: 1, //impt
                }}
              >
                {props.children}
              </td>
            );
          }
          else if (props.cell.customRenderer) {
            return <CustomCell {...props} />;
          } else {
            return <td style={{
              ...cellStyle,
              backgroundColor: "white",
              color: "black",
            }}>{props.children}</td>
          }
        }}
        onCellsChanged={changes => {
          const gridCopy = grid.map(row => [...row]);
          changes.forEach(({ cell, row, col, value }) => {
            gridCopy[row][col] = { ...gridCopy[row][col], value };
          });
          setGrid(gridCopy);
        }}
      />
    </div>

  );
}

export default App
