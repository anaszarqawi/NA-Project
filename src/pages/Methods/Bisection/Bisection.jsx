import React from 'react';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomSelectInput from '../components/CustomSelectInput/CustomSelectInput';
import CustomButton from '../components/CustomButton/CustomButton';

// import mathjs
// load math.js (using node.js)
import { create, all } from 'mathjs';

const Bisection = () => {
  const config = {};
  const math = create(all, config);
  const [fx, setFx] = React.useState('');
  const [xl, setXl] = React.useState(0);
  const [xu, setXu] = React.useState(0);
  const [es, setEs] = React.useState(0);
  const [conditionType, setConditionType] = React.useState('es');

  const [errorMsg, setErrorMsg] = React.useState('');

  const f = (x) => {
    return math.evaluate(fx, { x: x });
  };

  React.useEffect(() => {
    console.log(conditionType);
  }, [conditionType]);

  return (
    <div className="page">
      <div className="center-title">Bisection Method</div>
      <div className="variables">
        <div className="variables-block">
          <div className="variables-title">Variables</div>

          <CustomInput label="F(x)" type="text" placeholder="Mathematical Function" />
        </div>
        <div className="variables-inline">
          <CustomInput label="X" sub="l" type="number" placeholder="eXtreme Lower" />
          <CustomInput label="X" sub="u" type="number" placeholder="eXtreme Upper" />
        </div>
        <div className="variables-block">
          <div className="variables-title">Condition</div>
          <CustomInput
            label="ES"
            type="number"
            placeholder="Error Sum %"
            withSelect={true}
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
            name="it"
            onClick={setConditionType}
            condition={conditionType}
          />
        </div>
      </div>
      <div className="error-msg">{errorMsg}</div>
      <CustomButton label="Calculate" />
    </div>
  );
};

export default Bisection;
