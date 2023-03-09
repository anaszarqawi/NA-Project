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

      {props.data.map((item, index) => {
        return (
          <tr key={index}>
            {props.priority.map((priority) => {
              if (priority === 'i') return <td className="i-col">{item[priority]}</td>;
              else
                return (
                  <td className={props.highlight === priority && index == props.data.length - 1 ? 'highlight' : ''}>
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
