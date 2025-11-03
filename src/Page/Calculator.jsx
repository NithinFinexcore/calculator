import styles from "./Calculator.module.css";
import { useSelector, useDispatch } from "react-redux";
import { calDisplay, calculatorActions } from "../features/Calculator/CalculatorSlice";
import { useEffect, useState, useRef } from "react";

export default function Calculator() {
  const display = useSelector(calDisplay);
  const dispatch = useDispatch();

  const [showHistory, setShowHistory] = useState(false);
  const [remoteHistory, setRemoteHistory] = useState([]);
  const expressionRef = useRef("");

  const handleNum = (num) => {
    dispatch(calculatorActions.pressNum(num));
  };

  const handleOperator = (sign) => {
    dispatch(calculatorActions.pressOperator(sign));
  };

  const handlePercent = (sign) => {
    dispatch(calculatorActions.percent(sign));
  };

  const saveHistoryToDB = async (entry) => {
    try {
      await fetch("http://localhost:3001/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry })
      });
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };

  const handleEquals = () => {
    expressionRef.current = display; // Save expression before dispatch
    dispatch(calculatorActions.equals());
  };

  useEffect(() => {
    if (expressionRef.current) {
      const fullEntry = `${expressionRef.current} = ${display}`;
      saveHistoryToDB(fullEntry).then(() => {
        fetch("http://localhost:3001/history")
          .then((res) => res.json())
          .then((data) => setRemoteHistory(data))
          .catch((err) => console.error("Failed to fetch history:", err));
      });
      expressionRef.current = ""; // Reset after saving
    }
  }, [display]);

  useEffect(() => {
    fetch("http://localhost:3001/history")
      .then((res) => res.json())
      .then((data) => setRemoteHistory(data))
      .catch((err) => console.error("Failed to fetch history:", err));
  }, []);

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  const handleClearHistory = async () => {
  try {
    const res = await fetch("http://localhost:3001/history");
    const data = await res.json();

    // Delete each entry individually
    await Promise.all(
      data.map((item) =>
        fetch(`http://localhost:3001/history/${item.id}`, {
          method: "DELETE"
        })
      )
    );

    // Refresh local state
    setRemoteHistory([]);
  } catch (error) {
    console.error("Failed to clear history:", error);
  }
};


  return (
    <div className={styles.wrapper}>
      <div className={styles.calCont}>
        <h1 className={styles.head}>Calculator</h1>
        <div className={styles.screen}>{display || "0"}</div>
        <div className={styles.keysCont}>
          <button className={styles.operator} onClick={() => dispatch(calculatorActions.clear())}>C</button>
          <button className={styles.operator} onClick={() => dispatch(calculatorActions.backspace())}>{"⌫"}</button>
          <button className={styles.operator} onClick={() => handlePercent('%')}>%</button>
          <button className={styles.operator} onClick={() => handleOperator('/')}>/</button>
          <button className={styles.num} onClick={() => handleNum("7")}>7</button>
          <button className={styles.num} onClick={() => handleNum("8")}>8</button>
          <button className={styles.num} onClick={() => handleNum("9")}>9</button>
          <button className={styles.operator} onClick={() => handleOperator('x')}>x</button>
          <button className={styles.num} onClick={() => handleNum("4")}>4</button>
          <button className={styles.num} onClick={() => handleNum("5")}>5</button>
          <button className={styles.num} onClick={() => handleNum("6")}>6</button>
          <button className={styles.operator} onClick={() => handleOperator('-')}>-</button>
          <button className={styles.num} onClick={() => handleNum("1")}>1</button>
          <button className={styles.num} onClick={() => handleNum("2")}>2</button>
          <button className={styles.num} onClick={() => handleNum("3")}>3</button>
          <button className={styles.operator} onClick={() => handleOperator('+')}>+</button>
          <button className={styles.historyToggle} onClick={toggleHistory}>H</button>
          <button className={styles.zero} onClick={() => handleNum("0")}>0</button>
          <button className={styles.num} onClick={() => dispatch(calculatorActions.point())}>.</button>
          <button className={styles.operator} onClick={handleEquals}>=</button>
        </div>
      </div>

     {showHistory && (
        <div className={styles.historyPanel}>
            <h3>Calculation History</h3>
            <button className={styles.clearHistory} onClick={handleClearHistory}>Clear</button>
            <ul>
            {[...remoteHistory].reverse().map((item, index) => (
                <li key={index}>{item.entry}</li>
            ))}
            </ul>
        </div>
        )}

    </div>
  );
}
