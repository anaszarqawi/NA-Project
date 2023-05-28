import React from 'react';
import { useX } from '../context/xContext';
import Styles from '../styles/table.module.scss';
import MiniLabel from './MiniLabel';
import FadeChildren from './FadeChildren';

const CustomTable = (props) => {
  const { round } = useX();

  React.useEffect(() => {
    // console.log({ dataInTable: props.data });
  }, [props.data]);

  const customizeValue = (header, value, row) => {
    // if header is i
    if (header === 'i') return <td className={Styles.td + ' ' + Styles.i_col}>{value}</td>;
    // if row is first row put ea as '-'
    else if (header === 'ea' && row === 0) return <td className={Styles.td}>{'-'}</td>;
    // if column is ea
    else if (header === 'ea') return <td className={Styles.td}>{value + '%'}</td>;
    // if column is x and row is last row
    else if (props.highlight === header && row === props.data.length - 1)
      return (
        <td className={Styles.highlight + ' ' + Styles.td}>
          {value}
          {<MiniLabel label="Root" />}
        </td>
      );
    // if any other column
    else return <td className={Styles.td}>{value}</td>;
  };

  return (
    <FadeChildren>
      <div className={Styles.solution_table_container}>
        <table className={Styles.solution_table}>
          <tr className={Styles.tr}>
            {props.headers.map((header, index) => {
              if (header.name === 'i') return <th className={Styles.th + ' ' + Styles.i_col}>{header.name}</th>;
              else {
                if ('sub' in header) {
                  return (
                    <th className={Styles.th}>
                      {header.name}
                      <sub>{header.sub}</sub>
                    </th>
                  );
                } else {
                  return <th className={Styles.th}>{header.name}</th>;
                }
              }
            })}
          </tr>

          {props.data.map((item, i) => {
            return (
              <tr key={i} className={Styles.tr}>
                {props.priority.map((priority, j) => {
                  return customizeValue(priority, item[priority], i);
                })}
              </tr>
            );
          })}
        </table>
      </div>
    </FadeChildren>
  );
};

export default CustomTable;
