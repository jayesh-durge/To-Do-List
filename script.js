let today=[];
let week=[];
let month=[];
let year=[];
// to lists
document.querySelectorAll(".listname").forEach((list)=>{
    list.addEventListener("click",(e)=>{
        let parent=list.parentElement;
        parent.querySelectorAll("li").forEach(element => {
        if(parent.dataset.click=='true'){
            element.style.display="block";
        }
        else{
            element.style.display="";
        }
    });
        parent.dataset.click=='true'?parent.dataset.click='false':parent.dataset.click='true';
    });
});


//add new task in local storage
const addnew=(idx,text)=>{
    if(idx==0){
        today.push(text);
    }
    else if(idx==1){
        week.push(text);
    }
    else if(idx==2){
        month.push(text);
    }
    else if(idx==3){
        year.push(text);
    }
}


// editing task in local storage
const edit = (idx,oldtext,newtext)=>{
    if(idx==0){
        today.splice(today.indexOf(oldtext),1,newtext);
    }
    else if(idx==1){
        week.splice(week.indexOf(oldtext),1,newtext);
    }
    else if(idx==2){
        month.splice(month.indexOf(oldtext),1,newtext);
    }
    else if(idx==3){
        year.splice(year.indexOf(oldtext),1,newtext);
    }
}


// update list(add,edit value) and then calls to update array of correspounding to update local storage
function task(adder,idx,neww){
    let field=document.querySelector(".inputvalidate");
    field.style.display="block";
    let input=document.querySelector("input");
    document.querySelector("#ok").onclick= ()=>{
        if(input.value!=""){
        let li=!neww?document.createElement("li"):neww;
        li.innerText=input.value;
        li.style.display="block";
        input.value="";
        if(!neww){
        adder.after(li);
        addnew(idx,li.innerText);
        }
        else {
            edit(idx,adder,li.innerText);
        }
        updatestorage();
        }
        field.style.display="";
        return ;
    };
    document.querySelector("#not").onclick= ()=>{
        input.value="";
        field.style.display="";
        return ;
    }
}


//enable input to update list
document.querySelectorAll(".adder").forEach((plus,idx) =>{
    plus.addEventListener("click",()=>{
        task(plus,idx,false);
    });
});


// update local storage
let updatestorage=()=>{
    localStorage.setItem("today",JSON.stringify(today));
    localStorage.setItem("week",JSON.stringify(week));
    localStorage.setItem("month",JSON.stringify(month));
    localStorage.setItem("year",JSON.stringify(year));
}


// handle previous data
addEventListener("DOMContentLoaded",()=>{
    today=JSON.parse(localStorage.getItem("today"))||[];
    week=JSON.parse(localStorage.getItem("week"))||[];
    month=JSON.parse(localStorage.getItem("month"))||[];
    year=JSON.parse(localStorage.getItem("year"))||[];
    let add=document.querySelectorAll(".adder");
    today.forEach((element)=>{
        let li=document.createElement("li");
        li.innerText=element;
        add[0].after(li);
    });
    week.forEach((element)=>{
        let li=document.createElement("li");
        li.innerText=element;
        add[1].after(li);
    });
    month.forEach((element)=>{
        let li=document.createElement("li");
        li.innerText=element;
        add[2].after(li);
    });
    year.forEach((element)=>{
        let li=document.createElement("li");
        li.innerText=element;
        add[3].after(li);
    });
});


// swipe to delete element
let start;
document.addEventListener("touchstart",(e)=>{
    start=e.touches[0].clientX;
});

document.addEventListener("touchmove",(e)=>{
    let element=e.target;
    if(element.tagName=='LI'&& !element.classList.contains("adder") && Math.abs(e.touches[0].clientX-start)>60){

        let idx=Array.from(document.querySelectorAll("ul")).indexOf(document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY).parentElement);

        if(idx==0){
            today.splice(today.indexOf(element.innerText),1);
        }
        else if(idx==1){
            week.splice(today.indexOf(element.innerText),1);
        }
        else if(idx==2){
            month.splice(today.indexOf(element.innerText),1);
        }
        else if(idx==3){
            year.splice(today.indexOf(element.innerText),1);
        }
        element.remove();
        updatestorage();
    }
});


// edit task by double tap's
addEventListener("dblclick",(e)=>{
        if(e.target.tagName=="LI"&& !e.target.classList.contains("adder")){
           document.querySelector("input").value=e.target.innerText;
           idx=Array.from(document.querySelectorAll("ul")).indexOf(e.target.parentElement);
           task(e.target.innerText,idx,e.target);
        }
});