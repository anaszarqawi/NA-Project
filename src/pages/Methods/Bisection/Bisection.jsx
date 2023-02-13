import React from 'react';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomSelectInput from '../components/CustomSelectInput/CustomSelectInput';

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

  const f = (x) => {
    return math.evaluate(fx, { x: x });
  };

  return (
    <div className="page">
      <div className="center-title">Bisection Method</div>
      <div className="variables">
        <div className="variables-block">
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
          />
        </div>
      </div>
    </div>
  );
};

export default Bisection;
