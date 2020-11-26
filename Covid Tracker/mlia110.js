function toggleSide(){
    if(document.getElementById("sidebar").style.width ==="0px"|| document.getElementById("sidebar").style.width===""){

        document.getElementById("sidebar").style.width = "250px";

    }
    else{

        document.getElementById("sidebar").style.width ="0";

    }

}

function closeSide(){
    document.getElementById("sidebar").style.width ="0";

}

function showGlobal(){
    document.getElementById("graph1").innerHTML ="";
    const url = "https://api.coronatracker.com/v3/stats/worldometer/global";
    const xhr = new XMLHttpRequest();

    xhr.open("GET",url,true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onload=()=>{
        const resp = JSON.parse(xhr.responseText)
        GlobalData(resp);
    }
    xhr.send(null);
    document.getElementById("Globalcanvas").style.display = "inline";
    document.getElementById("NZcanvas").style.display = "none";


}

function GlobalData(resp){

    document.getElementById("graphtitle").innerHTML ="";
    document.getElementById("headtitle").innerHTML ="Covid-19 cases around the world";
    let infectious = 0;
    let Deaths = 0;
    let recovered = 0;



    infectious = resp.totalConfirmed;
    Deaths = resp.totalDeaths;
    recovered = resp.totalRecovered;


    document.getElementById("numberofinfections").innerHTML = infectious;
    document.getElementById("numberofdeaths").innerHTML = Deaths;
    document.getElementById("numberofrecovered").innerHTML = recovered;

    Globalgraph();
}




function showNZ(){
    document.getElementById("graph1").innerHTML ="";
    const url = "https://api.coronatracker.com/v3/stats/worldometer/country?countryCode=NZ"
    const xhr = new XMLHttpRequest();

    xhr.open("GET",url,true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onload=()=>{
        const resp = JSON.parse(xhr.responseText)
        NZData(resp);
    }
    xhr.send(null);
    document.getElementById("NZcanvas").style.display = "inline";
    document.getElementById("Globalcanvas").style.display = "none";

}

function NZData(resp){

    document.getElementById("graphtitle").innerHTML ="";
    document.getElementById("headtitle").innerHTML ="New Zealand Covid-19 Tracker";
    let total_confirmed = 0;
    let total_deaths = 0;
    let total_recovered = 0;

    let data = Object.entries(resp[0])


    const addRecord = (record)=>{




        let total_confirmed= data[4][1];
        let total_deaths = data[5][1];
        let total_recoveries = data[6][1];
        let daily_new = data[7][1];
        let daily_death = data[8][1];
        let active_case = data[9][1];
        console.log(total_confirmed);

        if(record[0] !== "stat"){
            let date = data[15][1];
            console.log(date);
            document.getElementById("date").innerHTML = "last update: "+ date;
        }
        document.getElementById("numberofinfections1").innerHTML = total_confirmed;
        document.getElementById("numberofdeaths1").innerHTML = total_deaths;
        document.getElementById("numberofrecovered1").innerHTML = total_recoveries;
        document.getElementById("infectiousyesterday1").innerHTML ="+ " + daily_new;
        document.getElementById("deathsyesterday1").innerHTML = "+ " +daily_death;
        document.getElementById("recoveredyesterday1").innerHTML = "</br>";





    }
    data.forEach(addRecord)


    NZgraph();
}

function NZgraph(){
    document.getElementById("graphtitle").innerHTML ="";
    document.getElementById("graph1").innerHTML ="";

    let total_cases = document.getElementById("numberofinfections1").innerHTML;
    let total_deaths = document.getElementById("numberofdeaths1").innerHTML;
    let total_recovered  =document.getElementById("numberofrecovered1").innerHTML;
    let active_cases = total_cases - total_deaths - total_recovered;


    let death_percentage = (total_deaths / total_cases) * (window.innerWidth-100);
    let recovered_percentage = (total_recovered/total_cases) *( window.innerWidth-100);
    let active_case_percentage = (active_cases/total_cases)* (window.innerWidth-100);


    const svg1 = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg1.setAttribute("width",window.innerWidth);
    svg1.setAttribute("height",200);


    const deaths = document.createElementNS("http://www.w3.org/2000/svg","rect");
    deaths.setAttribute("width",death_percentage)
    deaths.setAttribute("height",35);
    deaths.setAttribute("x",10);
    deaths.setAttribute("y",20);
    deaths.setAttribute("fill","red");

    const deaths_text = document.createElementNS("http://www.w3.org/2000/svg","text");
    deaths_text.setAttribute("x",death_percentage + 20);
    deaths_text.setAttribute("y",45);
    deaths_text.textContent=total_deaths + " deaths";

    const recovered = document.createElementNS("http://www.w3.org/2000/svg","rect");
    recovered.setAttribute("width",recovered_percentage)
    recovered.setAttribute("height",35);
    recovered.setAttribute("x",10);
    recovered.setAttribute("y",59);
    recovered.setAttribute("fill","green");

    const recovered_text = document.createElementNS("http://www.w3.org/2000/svg","text");
    recovered_text.setAttribute("x",recovered_percentage + 20);
    recovered_text.setAttribute("y",84);
    recovered_text.textContent=total_recovered + " recovered";


    const active_case = document.createElementNS("http://www.w3.org/2000/svg","rect");
    active_case.setAttribute("width",active_case_percentage)
    active_case.setAttribute("height",35);
    active_case.setAttribute("x",10);
    active_case.setAttribute("y",98);
    active_case.setAttribute("fill","yellow");

    const active_case_text = document.createElementNS("http://www.w3.org/2000/svg","text");
    active_case_text.setAttribute("x",active_case_percentage + 20);
    active_case_text.setAttribute("y",123);
    active_case_text.textContent = active_cases + " active cases";





    svg1.appendChild(deaths);
    svg1.appendChild(recovered);
    svg1.appendChild(active_case);
    svg1.appendChild(deaths_text);
    svg1.appendChild(recovered_text);
    svg1.appendChild(active_case_text);

    document.getElementById("graphtitle").innerHTML+="A graph that shows the number of cases of Covid-19 in New Zealand"
    document.getElementById("graph1").appendChild(svg1);
}

function Globalgraph(){
    document.getElementById("graphtitle").innerHTML ="";
    document.getElementById("graph1").innerHTML ="";
    let total_cases = document.getElementById("numberofinfections").innerHTML;
    let total_deaths = document.getElementById("numberofdeaths").innerHTML;
    let total_recovered  =document.getElementById("numberofrecovered").innerHTML;
    let active_cases = total_cases - total_deaths - total_recovered;


    let death_percentage = (total_deaths / total_cases) * window.innerWidth;
    let recovered_percentage = (total_recovered/total_cases) * window.innerWidth;
    let active_case_percentage = (active_cases/total_cases)* window.innerWidth;


    const svg1 = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg1.setAttribute("width",window.innerWidth);
    svg1.setAttribute("height",200);


    const deaths = document.createElementNS("http://www.w3.org/2000/svg","rect");
    deaths.setAttribute("width",death_percentage)
    deaths.setAttribute("height",35);
    deaths.setAttribute("x",10);
    deaths.setAttribute("y",20);
    deaths.setAttribute("fill","red");

    const deaths_text = document.createElementNS("http://www.w3.org/2000/svg","text");
    deaths_text.setAttribute("x",death_percentage + 20);
    deaths_text.setAttribute("y",45);
    deaths_text.textContent=total_deaths + " deaths";

    const recovered = document.createElementNS("http://www.w3.org/2000/svg","rect");
    recovered.setAttribute("width",recovered_percentage)
    recovered.setAttribute("height",35);
    recovered.setAttribute("x",10);
    recovered.setAttribute("y",59);
    recovered.setAttribute("fill","green");

    const recovered_text = document.createElementNS("http://www.w3.org/2000/svg","text");
    recovered_text.setAttribute("x",recovered_percentage + 20);
    recovered_text.setAttribute("y",84);
    recovered_text.textContent=total_recovered + " recovered";


    const active_case = document.createElementNS("http://www.w3.org/2000/svg","rect");
    active_case.setAttribute("width",active_case_percentage)
    active_case.setAttribute("height",35);
    active_case.setAttribute("x",10);
    active_case.setAttribute("y",98);
    active_case.setAttribute("fill","yellow");

    const active_case_text = document.createElementNS("http://www.w3.org/2000/svg","text");
    active_case_text.setAttribute("x",active_case_percentage + 20);
    active_case_text.setAttribute("y",123);
    active_case_text.textContent = active_cases + " active cases";





    svg1.appendChild(deaths);
    svg1.appendChild(recovered);
    svg1.appendChild(active_case);
    svg1.appendChild(deaths_text);
    svg1.appendChild(recovered_text);
    svg1.appendChild(active_case_text);

    document.getElementById("graphtitle").innerHTML+="A graph that shows the number of cases of Covid-19 around the world"
    document.getElementById("graph1").appendChild(svg1);
}
window.addEventListener("resize",resize);
function resize(){
    if(document.getElementById("NZcanvas").style.display === "inline"){
        NZgraph();
    }
    else if(document.getElementById("Globalcanvas").style.display === "inline"){
        Globalgraph();
    }
}
