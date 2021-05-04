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
        let out =``;
        let sessionDetails =``;
        for (var i=0; i<data.centers.length; i++){
            temp = data.centers[i];
            if(checkMinAge(temp)){
                for(var z=0; z<temp.sessions.length; z++){
                    if(temp.sessions[z].min_age_limit==18){
                        sessionDetails += `  <div class="sessions">
                                                <h6>Date:</h6>
                                                <p>${temp.sessions[z].date}</p>
                                                <h6>Available Vaccine:</h6>
                                                <p>${temp.sessions[z].vaccine}</p>
                                                <h6>Available Capacity:</h6>
                                                <p>${temp.sessions[z].available_capacity}</p>
                                                <h6>Available time slots:</h6>
                                                <p>${temp.sessions[z].slots}</p>
                                            </div>`;
                    }
                }

                out += ` <div class="card">
                            <div class="general">
                                <h6>Vaccination Center:</h6>
                                <p>${temp.name}
                                ${temp.address}</p>
                                <p>Block Name: ${temp.block_name}</p>
                                <p>${temp.district_name}</p>
                                <h6>Fee Details:</h6>
                                <p>${temp.fee_type}
                                ${sessionDetails}</p>
                            </div>
                        </div>`;

                pr = out;
            }
        }
        console.log(pr);
        document.getElementById("ans").innerHTML = pr;
    }
    api_call(pin);


}