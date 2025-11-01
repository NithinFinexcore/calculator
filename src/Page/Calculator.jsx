import styles from "./Calculator.module.css"
import { useSelector } from "react-redux";
import { calDisplay } from "../features/Calculator/CalculatorSlice";
import { calculatorActions } from "../features/Calculator/CalculatorSlice";
import { useDispatch } from "react-redux";

export default function Calculator(){
    
    let display = useSelector(calDisplay);
    let dispatch = useDispatch();

    const handleNum = (num)=>{
        dispatch(calculatorActions.pressNum(num))
    }
    const handleOperator = (sign)=>{
        dispatch(calculatorActions.pressOperator(sign))
    }
    const handlePercent = (sign)=>{
        dispatch(calculatorActions.percent(sign))
    }
  

    return(
        <>
            <div className={styles.calCont}>
                <h1 className={styles.head}>Calculator</h1>
            <div className={styles.screen}>
                {display?display:"0"}
            </div>
            <div className={styles.keysCont}>
                <button className={styles.operator} onClick={()=>dispatch(calculatorActions.clear())}>C</button>
                <button className={styles.operator} onClick={()=>dispatch(calculatorActions.backspace())}>{"<-"}</button>
                <button className={styles.operator} onClick={()=>handlePercent('%')}>%</button>
                <button className={styles.operator} onClick={()=>handleOperator('/')}>/</button>
                <button className={styles.num} onClick={()=>handleNum("7")}>7</button>
                <button className={styles.num} onClick={()=>handleNum("8")}>8</button>
                <button className={styles.num} onClick={()=>handleNum("9")}>9</button>
                <button className={styles.operator} onClick={()=>handleOperator('x')}>x</button>
                <button className={styles.num} onClick={()=>handleNum("4")}>4</button>
                <button className={styles.num} onClick={()=>handleNum("5")}>5</button>
                <button className={styles.num} onClick={()=>handleNum("6")}>6</button>
                <button className={styles.operator} onClick={()=>handleOperator('-')}>-</button>
                <button className={styles.num} onClick={()=>handleNum("1")}>1</button>
                <button className={styles.num} onClick={()=>handleNum("2")}>2</button>
                <button className={styles.num} onClick={()=>handleNum("3")}>3</button>
                <button className={styles.operator} onClick={()=>handleOperator('+')}>+</button>
                <button className={styles.zero} onClick={()=>handleNum("0")}>0</button>
                <button className={styles.num} onClick={()=>dispatch(calculatorActions.point())}>.</button>
                <button className={styles.operator} onClick={()=>dispatch(calculatorActions.equals())}>=</button>
                
            </div>
        </div>
        </>
    )
}