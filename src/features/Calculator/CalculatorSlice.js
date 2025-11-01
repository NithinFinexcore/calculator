import { createSlice } from "@reduxjs/toolkit";

let INITIAL_STATE = {firstOperand:"",secondOperand:"",isSecondOperandEmpty:true,operator:"",isLastOperator:false,display:"",pointNum:"",hasPoint:false};


export const calSlice = createSlice({
    name:"calculator",
    initialState:INITIAL_STATE,
    reducers:{
        reset:(state,action)=>{
            state.total=0;
        },
        pressNum:(state,action)=>{
           
            if(!state.isSecondOperandEmpty){
                state.secondOperand = state.secondOperand.concat(action.payload);
             
            }else{
                state.firstOperand = state.firstOperand.concat(action.payload);              
            }

            state.display = state.display.concat(action.payload);
            state.isLastOperator = false;
        },
        pressOperator:(state,action)=>{
            if(state.display!=""){
                if(state.operator!=""){
                    let sign = state.operator;

                    switch (sign) {
                        case "+":
                            state.firstOperand = Number(state.firstOperand)+Number(state.secondOperand);
                            break;
                        case "-":
                            state.firstOperand = Number(state.firstOperand)-Number(state.secondOperand);
                            break;
                        case "/":
                            state.firstOperand = Number(state.firstOperand)/Number(state.secondOperand);
                            break;
                        case "x":
                            state.firstOperand = Number(state.firstOperand)*Number(state.secondOperand);
                            break;
                        default:
                            console.log("invalid operator")
                            break;
                    }
                    state.operator = action.payload;
                    state.isSecondOperandEmpty = true;
                }else{
                    state.operator = action.payload;
                }
                state.secondOperand = "";
                state.display = state.display.concat(action.payload);
                state.isSecondOperandEmpty = false;
                state.hasPoint = false;
            }

        },
        clear:(state,action)=>{
            state.display = "";
            state.firstOperand = "";
            state.secondOperand = "";
            state.isSecondOperandEmpty = true;
            state.operator = "";
            state.isLastOperator = false;
            state.hasPoint = false;
        },
        equals:(state,action)=>{
            if(state.firstOperand !="" && state.secondOperand !=""){

                let sign = state.operator;

                    switch (sign) {
                        case "+":
                            state.firstOperand = Number(state.firstOperand)+Number(state.secondOperand);
                            break;
                        case "-":
                            state.firstOperand = Number(state.firstOperand)-Number(state.secondOperand);
                            break;
                        case "/":
                            state.firstOperand = Number(state.firstOperand)/Number(state.secondOperand);
                            break;
                        case "x":
                            state.firstOperand = Number(state.firstOperand)*Number(state.secondOperand);
                            break;
                        default:
                            console.log("invalid operator")
                            break;
                    }
            }
            let strNum = String(state.firstOperand);
            if(strNum.includes('.')){
                state.firstOperand = Number(state.firstOperand).toFixed(2);
            }
            state.firstOperand = String(state.firstOperand);
            state.display = state.firstOperand;
            state.secondOperand = "";
            state.isSecondOperandEmpty = true; 
            state.operator = "";
        },
        percent:(state,action)=>{
            if(state.isSecondOperandEmpty){
                state.firstOperand = (Number(state.firstOperand)/100).toFixed(2);
                state.display = String(state.firstOperand);

            }else{
                let sign = state.operator;

                    switch (sign) {
                        case "+":
                            state.firstOperand = Number(state.firstOperand)+Number(state.secondOperand);
                            break;
                        case "-":
                            state.firstOperand = Number(state.firstOperand)-Number(state.secondOperand);
                            break;
                        case "/":
                            state.firstOperand = (Number(state.firstOperand)/Number(state.secondOperand)).toFixed(2);
                            break;
                        case "x":
                            state.firstOperand = Number(state.firstOperand)*Number(state.secondOperand);
                            break;
                        default:
                            console.log("invalid operator")
                            break;
                    }
                state.firstOperand = Number(state.firstOperand/100).toFixed(2);
                
                state.secondOperand = "";
                state.isSecondOperandEmpty = true;
                state.operator = "";
            }
        },
        point:(state,action)=>{
            
            if(state.isSecondOperandEmpty){
                if(!state.firstOperand.includes('.')){
                    if(state.firstOperand.length==0){
                        state.firstOperand = state.firstOperand.concat('0.');
                        state.display = state.display.concat(state.firstOperand);
                    }else{
                        state.firstOperand = state.firstOperand.concat('.');
                        state.display = state.display.concat('.');
                    }
                    
                }
            }else{
                if(!state.secondOperand.includes('.')){
                    if(state.secondOperand.length==0){
                    state.secondOperand = state.secondOperand.concat('0.');
                    state.display = state.display.concat(state.secondOperand);

                    }else{
                        state.secondOperand = state.secondOperand.concat('.');
                        state.display = state.display.concat('.');
                    }
                }
            }
                
            
        },
        backspace:(state,action)=>{
            if(state.isSecondOperandEmpty){
                if(state.firstOperand.length>1){
                    state.firstOperand = state.firstOperand.slice(0,-1);
                }
            }else{
                if(state.secondOperand.length>1){
                    state.secondOperand = state.secondOperand.slice(0,-1);
                }
            }
            if(state.display.length>1){
                state.display = state.display.slice(0,-1);
            }
        }
    }
})

export const calReducer = calSlice.reducer;
export let calculatorActions = calSlice.actions;
export const calDisplay = (state)=> state.calculator.display;