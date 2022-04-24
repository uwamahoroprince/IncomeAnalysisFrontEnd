import React, { useState, useEffect } from "react";
import { url } from "../../constants/url";
import axios from "axios";
import * as tf from "@tensorflow/tfjs";

const IncomeAnalysis = () => {
  const valuePairState = [];
  const [modelState, setModelState] = useState({
    model: null,
    trained: false,
    predictedValue: "Click on train",
    valueToPredict: 1,
  });
  const getAllTransactions = async () => {
    try {
      let expensePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let incomePerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const response = await axios.get(`${url.transaction}`);
      const data = response.data.data;
      for (const key in data) {
        let month = new Date(data[key].createdAt).getMonth() + 1;
        if (data[key].type === "expense") {
          expensePerMonth[month] = expensePerMonth[month] + data[key].amount;
        } else {
          incomePerMonth[month] = incomePerMonth[month] + data[key].amount;
        }

        let index = valuePairState.findIndex((el) => el.month === month);
        // console.log(index);
        if (index != -1) {
          valuePairState[index] = {
            month: month,
            x: expensePerMonth[month],
            y: incomePerMonth[month],
          };
          //   console.log(valuePairState);
        } else {
          if (data[key].type === "expense") {
            valuePairState.push({
              month: month,
              x: data[key].amount,
              y: 0,
            });
            // console.log(valuePairState);
          } else {
            valuePairState.push({
              month: month,
              x: 0,
              y: data[key].amount,
            });
            // console.log(valuePairState);
          }
        }
      }

      //   console.log(valuePairState);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllSubscription = async () => {
    try {
      const response = await axios.get(`${url.memberShip}`);
      const data = response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const trainHandler = () => {
    try {
      let xValues = [],
        yValues = [];

      valuePairState.forEach((val, index) => {
        xValues.push(val.x);
        yValues.push(val.y);
      });
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
      const xs = tf.tensor2d(xValues, [xValues.length, 1]);
      const ys = tf.tensor2d(yValues, [yValues.length, 1]);

      model.fit(xs, ys, { epochs: 250 }).then(() => {
        setModelState({
          ...modelState,
          model: model,
          trained: true,
          predictedValue: "Ready for making predictions",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePredict = () => {
    const predictedValue = modelState.model
      .predict(tf.tensor2d([modelState.valueToPredict], [1, 1]))
      .arraySync()[0][0];

    setModelState({
      ...modelState,
      predictedValue: predictedValue,
    });
  };
  const handelModelChange = (e) =>
    setModelState({
      ...modelState,
      [e.target.name]: [parseInt(e.target.value)],
    });

  useEffect(() => {
    getAllTransactions();
    getAllSubscription();
  }, []);
  return (
    <>
      <input
        type="number"
        value={modelState.valueToPredict}
        name="valueToPredict"
        onChange={handelModelChange}
        placeholder="enter a number"
      />

      <button onClick={handlePredict} disabled={!modelState.trained}>
        Predict
      </button>
      <button onClick={trainHandler}>Train</button>
      <div className="m-2">{modelState.predictedValue}</div>
    </>
  );
};
export default IncomeAnalysis;
