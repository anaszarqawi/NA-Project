import React from 'react';
import './style.scss';

const CustomTable = (props) => {
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
              if (priority === 'i') return <td className="i-col">{item[priority]}</td>;
              else
                return (
                  <td
                    key={j}
                    className={props.highlight === priority && i === props.data.length - 1 ? 'highlight' : ''}>
                    {item[priority]}
                  </td>
                );
            })}
          </tr>
        );
      })}
    </table>
  );
};

export default CustomTable;
