import React, { FC, useState } from "react";
import "./App.css";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ModelViewer: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(
    model.paramValues,
  );
  const [showModel, setShowModel] = useState<boolean>(false);
  const [stateModel, setStateModel] = useState<ParamValue[]>(model.paramValues);

  const handleChange = (paramId: number, value: string) => {
    setParamValues((prev) =>
      prev.map((param) =>
        param.paramId === paramId ? { ...param, value } : param,
      ),
    );
  };

  const getModel = () => {
    setShowModel(true);
    setStateModel(paramValues);
  };

  return (
    <div>
      {params.map((param) => {
        const paramValue =
          paramValues.find((p) => p.paramId === param.id)?.value || "";
        return (
          <div key={param.id} style={{ marginBottom: 10, marginTop: 5 }}>
            <label style={{ fontWeight: "bold", marginRight: "10px" }}>
              {param.name}
            </label>
            <input
              type="text"
              value={paramValue}
              onChange={(e) => handleChange(param.id, e.target.value)}
            />
          </div>
        );
      })}
      <button onClick={getModel}>
        {showModel ? "Изменить" : "Получить"} модель
      </button>
      {showModel && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
          }}
        >
          <h3>Модель</h3>
          {stateModel.map((model) => {
            const modelName = params.find((p) => p.id === model.paramId)?.name;
            return (
              <p key={model.paramId}>
                <strong>{modelName}:</strong> {model.value}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
  ],
};

const App: FC = () => {
  return (
    <div>
      <ModelViewer params={params} model={model} />
    </div>
  );
};

export default App;
