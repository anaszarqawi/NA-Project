import React from 'react';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomSelectInput from '../components/CustomSelectInput/CustomSelectInput';
import CustomButton from '../components/CustomButton/CustomButton';
import './style.scss';

// import mathjs
// load math.js (using node.js)
import { create, all } from 'mathjs';

const Bisection = () => {
  const config = {};
  const math = create(all, config);

  const [fx, setFx] = React.useState(null);
  const [xl, setXl] = React.useState(null);
  const [xu, setXu] = React.useState(null);
  const [es, setEs] = React.useState(null);
  const [it, setIt] = React.useState(null);

  const [conditionType, setConditionType] = React.useState('es');
  const [showSolution, setShowSolution] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [errorMsg, setErrorMsg] = React.useState('');

  const f = (x) => {
    return math.evaluate(fx, { x: x });
  };

  //   React.useEffect(() => {
  //     console.log(fx);
  //     console.log(xl);
  //     console.log(xu);
  //     console.log(es);
  //     console.log(conditionType);
  //     console.log(it);
  //   }, [fx, xl, xu, es, conditionType, it]);

  const bisection = () => {
    let xl_ = xl;
    let xu_ = xu;
    let xr = 0;
    let xrOld = 0;
    let ea = 0;
    let i = 0;
    let data = [];
    let error = false;

    if (fx === null) {
      setErrorMsg('Please enter a function');
      error = true;
    }
    if (xl === null) {
      setErrorMsg('Please enter a value for xl');
      error = true;
    }
    if (xu === null) {
      setErrorMsg('Please enter a value for xu');
      error = true;
    }
    if (es === null && conditionType === 'es') {
      setErrorMsg('Please enter a value for es');
      error = true;
    }
    if (it === null && conditionType === 'it') {
      setErrorMsg('Please enter a value for it');
      error = true;
    }
    if (error) {
      return;
    }
    // check if there is a root in the range
    if (f(xl_) * f(xu_) > 0) {
      setErrorMsg('No root in this range');
      return;
    }

    do {
      xrOld = xr;
      xr = (xl_ + xu_) / 2;
      if (f(xr) * f(xu_) < 0) {
        xl_ = xr;
      } else {
        xu_ = xr;
      }
      console.log({ xl_, xu_ });
      i++;
      ea = Math.abs((xr - xrOld) / xr) * 100;
      // round ea to 1 decimal point
      ea = Math.round(ea * 10) / 10;

      data.push({
        i: i,
        xl: xl_,
        fxl: f(xl_),
        xr: xr,
        fxr: f(xr),
        xu: xu_,
        fxu: f(xu_),
        ea: ea + '%',
      });
      console.log(data);
      console.log(conditionType === 'es' ? ea > es : i < it);
    } while (conditionType === 'es' ? ea > es : i < it);

    setData(data);
    setShowSolution(true);
    console.log(data);
  };

  return (
    <div className="page">
      <div className="center-title">Bisection Method</div>
      <div className="variables">
        <div className="variables-block">
          <div className="variables-title">Variables</div>

          <CustomInput label="F(x)" type="text" placeholder="Mathematical Function" onChange={setFx} />
        </div>
        <div className="variables-inline">
          <CustomInput label="X" sub="l" type="number" placeholder="eXtreme Lower" onChange={setXl} />
          <CustomInput label="X" sub="u" type="number" placeholder="eXtreme Upper" onChange={setXu} />
        </div>
        <div className="variables-block">
          <div className="variables-title">Condition</div>
          <CustomInput
            label="ES"
            type="number"
            placeholder="Error Sum %"
            withSelect={true}
            onChange={setEs}
            options={[
              { label: '=', value: '=' },
              { label: '<', value: '<' },
              { label: '>', value: '>' },
              { label: '<=', value: '<=' },
              { label: '>=', value: '>=' },
            ]}
            withCheckbox={true}
            name="es"
            onClick={setConditionType}
            condition={conditionType}
          />
          <CustomInput
            label="MAXi"
            type="number"
            placeholder="Max Iteration"
            withCheckbox={true}
            onChange={setIt}
            name="it"
            onClick={setConditionType}
            condition={conditionType}
          />
        </div>
      </div>
      <div className="error-msg">{errorMsg}</div>
      <CustomButton label="Calculate" onClick={bisection} />
      {showSolution && (
        <>
          <hr className="line-divider"></hr>
          <div className="center-title">Solution</div>
          <div className="solution-table-container">
            <table className="solution-table">
              <tr>
                <th>i</th>
                <th>xl</th>
                <th>fxl</th>
                <th>xr</th>
                <th>fxr</th>
                <th>xu</th>
                <th>fxu</th>
                <th>ea</th>
              </tr>

              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.i}</td>
                    <td>{item.xl}</td>
                    <td>{item.fxl}</td>
                    <td>{item.xr}</td>
                    <td>{item.fxr}</td>
                    <td>{item.xu}</td>
                    <td>{item.fxu}</td>
                    <td>{item.ea}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Bisection;
