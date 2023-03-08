import React from 'react';

const CustomTable = (props) => {
  return (
    <table className="solution-table">
      <tr>
        {props.headers.map((header, index) => {
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
        })}
      </tr>

      {props.data.map((item, index) => {
        return (
          <tr key={index}>
            {props.priority.map((priority, index) => {
              return <td>{item[priority]}</td>;
            })}
          </tr>
        );
      })}
    </table>
  );
};

export default CustomTable;
