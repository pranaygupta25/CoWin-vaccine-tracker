function getData(){
    var pin = document.getElementById("pin").value; 

    function checkMinAge(obj){
        let flag = false;
        for(let i=0; i<obj.sessions.length; i++){
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
                                                <p class="date">${temp.sessions[z].date}</p>
                                                <h6>Available Vaccine:</h6>
                                                <p class="vaccine">${temp.sessions[z].vaccine}</p>
                                                <h6>Available Capacity:</h6>
                                                <p class="capacity">${temp.sessions[z].available_capacity}</p>
                                                <h6>Available time slots:</h6>
                                                <p class="slots">${temp.sessions[z].slots}</p>
                                            </div>`;
                    }
                }

                out += ` <div class="card">
                            <div class="general">
                                <h6>Vaccination Center:</h6>
                                <p class="name">${temp.name}</p>
                                <div class="address">
                                <p>${temp.address}</p>
                                <p>Block Name: ${temp.block_name}</p>
                                <p>${temp.district_name}</p>
                                </div>
                                <h6>Fee Details:</h6>
                                <div class="fee">
                                <p>${temp.fee_type}</p>
                                </div>
                                </div>
                                <div class= "sessionTotal">${sessionDetails}</div>
                        </div>`;

                pr = out;
            }
        }

        if(pr.length == 0){
            pr =    `
                    <div class="card">
                    <div class="error">
                    <h6>Sorry, there seems to be no available vaccination centers for the next 7 days</h6>
                    <p>Please try again later</p>
                    </div>
                    </div>
                    `;
        }
        document.getElementById("ans").innerHTML = pr;
    }
    api_call(pin);


}