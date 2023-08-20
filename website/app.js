/* Global Variables */
 const generate = document.getElementById("generate");
 const zip = document.getElementById("zip");
 const feelings = document.getElementById("feelings");
 const temp = document.getElementById("temp");


 //API key from OpenWeatherMap

 const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
 const apikey = "&appid=ee9fa151ba2c50a9a3631173c995f565&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+' . '+ d.getDate()+' . '+ d.getFullYear();

//Event listener when click on Generate
generate.addEventListener('click', GenerateData);

//GenerateData function
function GenerateData(e){
const newZip = zip.value;
const thefeelings = feelings.value;
getWeather(baseURL, newZip, apikey)

    .then(function(data) {

        console.log(data);
        //adding the data to the POST request
        postData('/AddData',{date:d, temp:data.main.temp, content:thefeelings})
        updateUI();
    })
};

//Function to get the web API Data
const getWeather = async(baseURL, zip, key)=>{

    const res = await fetch(baseURL+zip+key)
    try{
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log("Error,", error);
    }
}


//Function to POST the Data 

const postData = async (url='', data= {})=> {

    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error) {
        console.log("Error,", error);
    }
}

const updateUI = async () =>{
    const request = await fetch('/AllData');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = 'temp: '+Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = 'Im feeling: ' + allData.content;
    document.getElementById('date').innerHTML ='Date: '+allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }