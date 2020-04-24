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
    reset:function () {
        return 0;
    },
    coma:function (a,b) {
        let floating=a.toString()+","+b.toString();
        return parseFloat(floating);
    }
  }
function operator(componentes,operation) {
    if(componentes["a"]&&componentes["b"]){
        return operators[operation](componentes["a"],componentes["b"]);
    }
    else if (componentes["a"]) {
        return operators[operation](componentes["a"]);
    } else if(isEmpty(componentes)){
        return operators[operation]();
    }
    

}
function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}
console.log(operator({a:10,b:20,},"add"));
