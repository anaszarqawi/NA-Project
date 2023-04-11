import React from 'react';
import './style.scss';
import { useX } from '../../../../context/xContext';

const CustomTable = (props) => {
  const { round } = useX();

  React.useEffect(() => {
    console.log({ dataInTable: props.data });
  }, [props.data]);

  const customizeValue = (header, value, row) => {
    // if header is i
    if (header === 'i') return <td className="i-col">{round(value)}</td>;
    // if row is first row put ea as '-'
    else if (header === 'ea' && row === 0) return <td>{'-'}</td>;
    // if column is ea
    else if (header === 'ea') return <td>{round(value) + '%'}</td>;
    // if column is x and row is last row
    else if (props.highlight === header && row === props.data.length - 1)
      return <td className="highlight">{round(value)}</td>;
    // if any other column
    else return <td>{round(value)}</td>;
  };

  return (
    <table className="solution-table">
      <tr>
        {props.headers.map((header, index) => {
          if (header.name === 'i') return <th className="i-col">{header.name}</th>;
          else {
            if ('sub' in header) {
              return (
                <th>
                  {header.name}
                  <sub>{header.sub}</sub>
                </th>
              );
            } else {
              return <th>{header.name}</th>;
            }
          }
        })}
      </tr>

      {props.data.map((item, i) => {
        return (
          <tr key={i}>
            {props.priority.map((priority, j) => {
              return customizeValue(priority, item[priority], i);
            })}
          </tr>
        );
      })}
    </table>
  );
};

export default CustomTable;
