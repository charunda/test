import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const radius = 200;
  const dashArray = radius * 2 * Math.PI;
  const [percent, setPercent] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(dashArray);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const atbCircle = { cx: 250, cy: 250 };
  const [arrX, setArrX] = useState([]);
  useEffect(() => {
    calPie(75);
    createPyramid();
  }, []);
  const createPyramid = () => {
    let tmp = [];
    for (let i = 1; i <= 10; i++) {
      let filledArray = new Array(i * 2 - 1).fill("e");
      filledArray[0] = "X";
      filledArray[i * 2 - 2] = "X";

      tmp = [...tmp, [...filledArray]];
    }
    console.log(tmp);
    let a = "X".repeat(10 * 2 - 1).split("");
    console.log(a);
    tmp.push(a);
    setArrX(tmp);
  };
  useEffect(() => {
    if (percent === 100) {
      setDisableAdd(true);
      setDisableDelete(false);
    } else if (percent === 0) {
      setDisableAdd(false);
      setDisableDelete(true);
    } else {
      setDisableAdd(false);
      setDisableDelete(false);
    }
  }, [percent]);
  const calPie = (value) => {
    const result = dashArray - (value / 100) * dashArray;
    setPercent(value);
    setStrokeDashoffset(result);
  };
  const onClickAddPercent = () => {
    const value = percent + 5;
    calPie(value);
  };
  const onClickDeletePercent = () => {
    const value = percent - 5;
    calPie(value);
  };

  return (
    <div className="App">
      <svg width="500" height="500">
        <circle
          className="pie"
          cx={atbCircle.cx}
          cy={atbCircle.cy}
          r={radius}
          fill="none"
        />
        <circle
          strokeDasharray={dashArray}
          style={{
            strokeDashoffset: strokeDashoffset
          }}
          className="progress"
          cx={atbCircle.cx}
          cy={atbCircle.cy}
          r={radius}
          fill="none"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="blue"
          fontSize="3rem"
          fontWeight={600}
        >
          {percent}%
        </text>
      </svg>
      <div className="row">
        <div className="col">
          <button
            className="button-round"
            disabled={disableDelete}
            onClick={onClickDeletePercent}
          >
            -
          </button>
        </div>
        <div className="col">
          <button
            className="button-round"
            disabled={disableAdd}
            onClick={onClickAddPercent}
          >
            +
          </button>
        </div>
      </div>
      <hr className="divider-page" />
      <div>
        {arrX.map((item, index) => (
          <div className="div-x">
            {item.map((x, xIndex) =>
              x === "e" ? (
                <div className="flex-empty"></div>
              ) : (
                <span key={index + xIndex} className="p-x">
                  {x}
                </span>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
