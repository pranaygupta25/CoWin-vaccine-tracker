function getData(){
    var pin = document.getElementById("pin").value;
    console.log(typeof pin)

    function checkMinAge(obj){
        let flag = false;
        for(let i=0; i<obj.sessions.length; i++){
            console.log(obj.sessions[i].min_age_limit);
            if(obj.sessions[i].min_age_limit == 18){
                flag = true;
            }
        }
        return flag;
    }


    async function api_call(pin){
        let curr_date = new Date();
        let dd = curr_date.getDate();
        let mm = curr_date.getMonth()+1;
        let yyyy = curr_date.getFullYear();
        if(dd<10){
            dd = '0'+dd;
        }
        if(mm<10){
            mm = '0'+mm;
        }
        let today = dd + '-' + mm + '-' + yyyy;

        req_url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+(pin)+"&date="+(today);

        const res = await fetch(req_url);
        var data = await res.json();
        console.log(data);

        let pr;
        pr="";
        let temp;
        for (var i=0; i<data.centers.length; i++){
            if(checkMinAge(data.centers[i])){
                temp = data.centers[i].name;
                for(var j=0; j< data.centers[i].sessions.length; j++){
                    var f = data.centers[i].sessions[j].vaccine;
                }
                pr = pr+temp+"    "+f+"<br>";
            }
        }
        console.log(pr);
        document.getElementById("ans").innerHTML = pr;
    }
    api_call(pin);


}