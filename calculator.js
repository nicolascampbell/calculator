//creando variables globales
let bool_operadores=false;
var bool_numbers=true;
let bool_equal=true;
let bool_coma=false;
let a=undefined;
let b=undefined;
let operacion=undefined;
let resultado=undefined;
let start=false;

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
    },
    coma:function (a,b) {
        let floating=a.toString()+","+b.toString();
        return parseFloat(floating);
    }
  }
//Its like the manager of operators
function operator(componentes,operation) {
    if(componentes["a"]&&componentes["b"]){
        return operators[operation](componentes["a"],componentes["b"]);
    }
    else if (componentes["a"]) {
        return operators[operation](componentes["a"]);
    } else if(isEmpty(componentes)){
        return operators[operation]();
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
    return n1;
}
function update_display(update,that) {
    document.getElementById(that).innerHTML=update;
}
function get_display(that){
    return document.getElementById(that).value;
}
//event listeners
//numbers-->
var allButtons = document.querySelectorAll('.number');
for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function() {
      if(bool_numbers) {
        start=true;
        let zw=0;
        bool_operadores=true;
        bool_equal=true; 
        if(resultado!=0&&resultado!=undefined){
            zw=alarga_numeros(resultado,this.value);
        }else{
            zw=this.value;
        }
        update_display(zw,"result");
        resultado=Number(zw);
      }
    });
  }
//reset-->
var reset=document.getElementById("reset");
reset.addEventListener("click", function(event){
    a=undefined;
    b=undefined;
    operacion=undefined;
    resultado=0;
    bool_operadores=false;
    bool_numbers=true;
    bool_equal=true;
    bool_coma=false;
    update_display("0","result");
});
//equals-->
var equal=document.getElementById("equals");
equal.addEventListener("click", function(){
    if (bool_equal&&a!=undefined&&b==undefined&&resultado!=undefined&&operacion!=undefined){
        b=resultado;
        a=operator({a:a,b:b},operacion);//getting a from previous calculation
        update_display(a,"result"); 
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
var allOperators = document.querySelectorAll(".operator");
for (var i = 0; i < allOperators.length; i++) {
    allOperators[i].addEventListener("click",function () {
        if(bool_operadores){
            if(a==undefined){//getting a from the user directly
                a=resultado;
                bool_operadores=false;
                bool_coma=false;
                bool_equal=false;
                operacion=this.id;
                resultado=undefined;
            }else if(b==undefined&&operacion!=undefined){//in case we have a then operator and then b
                b=resultado;
                a=operator({a:a,b:b},operacion);
                update_display(a,"result")
                bool_operadores=false;
                bool_coma=false;
                operacion=this.id;
                b=undefined;
                resultado=undefined;
            }else if(resultado!=undefined){//in case a comes from a previous result, that means we got a then b and at the end the operator
                b=resultado;
                operacion=this.id;
                a=operator({a:a,b:b},operacion);
                update_display(a,"result")
                bool_operadores=false;
                bool_coma=false;
                b=undefined;
                resultado=undefined;
            }else{
                operacion=this.id;
            }
        
        }
  })
}