//creando variables globales
let bool_operadores=false;
var bool_numbers=true;
let bool_equal=true;
let bool_coma=true;
let a=undefined;
let b=undefined;
let operacion=undefined;
let resultado=undefined;
//object with all the operators
let operators = {
    add:function(a,b) {
        return a+b;
    },
    substract:function(a,b) {
        return a-b;
    },
    multiply:function (a,b) {
        return a*b
    },
    divide:function (a,b) {
        if(b!=0){
            return a/b;
        }else{
            return "You cant divide by 0";
        }
    },
    change_sign:function (a) {
        return -a;
    }
  }
//Its like the manager of operators
function operator(componentes,operation) {
    if(componentes["a"]&&componentes["b"]){
        return operators[operation](componentes["a"],componentes["b"]).toFixed(3);
    }
    else if (componentes["a"]) {
        return operators[operation](componentes["a"]).toFixed(3);
    } else if(isEmpty(componentes)){
        return operators[operation]().toFixed(3);
    }
//checking if an object is empty
}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}
/*
//creating number buttons
const button_table=document.getElementById("button_table");
for (let i = 0; i < 10; i++) {
    let temp= document.createElement("button");
    temp.innerHTML=i;
    temp.setAttribute("value",i);
    temp.classList.add("number");
    button_table.appendChild(temp);
}
*/
//funciones utiles
function alarga_numeros(n1,n2) {
    n1=n1+n2;
    return Number(n1);
}
function update_display(update) {
    document.getElementById("result").innerHTML=update;
}
function get_display(that){
    return document.getElementById(that).value;
}
//event listeners
//numbers-->
let allNumbers = document.querySelectorAll('.number');
for (let i = 0; i < allNumbers.length; i++) {
    allNumbers[i].addEventListener('click', function() {
      if(bool_numbers) {
        let zw=0;
        bool_operadores=true;
        bool_equal=true; 
        if(resultado!=undefined){
            zw=alarga_numeros(resultado,this.value);
        }else{
            zw=this.value;
            bool_coma=true;
        }
        update_display(zw);
        resultado=Number(zw);
      }
    });
  }
//reset-->
let reset=document.getElementById("reset");
reset.addEventListener("click", function(event){
    a=undefined;
    b=undefined;
    operacion=undefined;
    resultado=0;
    bool_operadores=false;
    bool_numbers=true;
    bool_equal=true;
    bool_coma=true;
    update_display("0");
});
//equals-->
let equal=document.getElementById("equals");
equal.addEventListener("click", function(){
    if (bool_equal&&a!=undefined&&b==undefined&&resultado!=undefined&&operacion!=undefined){
        b=resultado;
        a=operator({a:a,b:b},operacion);//getting a from previous calculation
        update_display(a); 
        b=undefined;
        resultado=undefined;
        operacion=undefined;
        bool_operadores=true;
        bool_coma=true;
        bool_numbers=true; 
        bool_equal=true;
        
    }
});
//operators-->
let allOperators = document.querySelectorAll(".operator");
for (let i = 0; i < allOperators.length; i++) {
    allOperators[i].addEventListener("click",function () {
        if(bool_operadores){
            if(a==undefined){//getting a from the user directly
                a=resultado;
                operacion=this.id;
                resultado=undefined;
                bool_equal=false;
            }else if(b==undefined&&operacion!=undefined){//in case we have a then operator and then b
                b=resultado;
                a=operator({a:a,b:b},operacion);
                update_display(a)
                operacion=this.id;
                b=undefined;
                resultado=undefined;
                bool_equal=false;
            }else if(resultado!=undefined){//in case a comes from a previous result, that means we got a then b and at the end the operator
                b=resultado;
                operacion=this.id;
                a=operator({a:a,b:b},operacion);
                update_display(a)
                b=undefined;
                resultado=undefined;
            }else if (resultado == undefined && operacion== undefined){
                operacion=this.id;
            }
            bool_operadores=false;
            bool_coma=false;
        }
  })
}
//coma-->
let coma=document.getElementById("coma");
coma.addEventListener("click", function(){
    if(bool_coma){
        if(resultado==undefined&&a!=undefined){
            resultado=a;
            a=undefined;
        }
        if(resultado.toString().indexOf(".")<0){
            resultado+=".";
            update_display(resultado);
            bool_operadores=false;
            bool_numbers=true;
            bool_coma=false;
            bool_equal=false;
        }
    }
});
let sign=document.getElementById("change_sign");
sign.addEventListener("click", function(){
    if(resultado!=undefined){
        resultado=operator({a:resultado},"change_sign");
        update_display(resultado);
    }else if(a!=undefined){
        resultado=a;
        resultado=operator({a:resultado},"change_sign");
        update_display(resultado);
        a=undefined;
    }
});
let del=document.getElementById("delete");
del.addEventListener("click", function(){
    if(resultado==undefined&&a!=undefined){
        resultado=a;
        a=undefined;
    }
    if(resultado.toString().length>1){
        resultado=Number(resultado.toString().slice(0,resultado.toString().length-1));
    }else{
        resultado=0;
    }
    update_display(resultado);
    
});
