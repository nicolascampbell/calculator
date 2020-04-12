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
function operator(a,b,operation) {
    return operators[operation](a,b);
}
function operator(a,operation){
    return operators[operation](a);
}
function operator(operation){
    return operators[operation]();
}

