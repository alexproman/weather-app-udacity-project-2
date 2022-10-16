/* Global Variables */

const zipCode = document.querySelector("#zip");
const feeling = document.querySelector("#feelings");
const generate = document.querySelector("#generate");
const temp = document.querySelector("#temp");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const content =document.querySelector('#content');

// api link that we fetch to get all weather data
const paseURI ="https://api.openweathermap.org/data/2.5/weather?zip=";
// api key and we add "&units=metric" to display temp ass Celsius
const Key ="&appid=e0fa4f9c66b9d7bf424576fdd7155b3f&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =d.toDateString();
//let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// add event listener to generate button to get data and process it using async functions
    generate.addEventListener("click",(eve)=>{
    eve.preventDefault();
    // give empty values to data containers to eraise  old data if user empty zipcode input and click the button without enter a new zipcode
          date.innerText=`` ;
        city.innerText=``;
        temp.innerText=``;
        content.innerText=``;
    //  Link to retrieve the data of zipcode entered by user
    const URI =`${paseURI}${zipCode.value}${Key}`
    //  console display all data when fetch api
    console.log(URI)  
    // Promises chaining //
    //--->> 1- get all data ---->  2- determine data we need ---> 3- post data to server --->
    //  4 - get new data from server ----> 5 - update user information . 
    getData(URI)
    .then((data)=>{ weatherData(data)
    .then((data)=>{postData("/addData",data)
    .then((data)=>{getNewData("/all")
    .then((data)=>{ updateUI(data) })
            })
         })
        })
    });
//_______________________________________________________________________
// async function to get all data.
const getData = async(map)=>{
    try{
        // await fetch api link
        const resData = await fetch(map);
        // convert data json file to js opject
        const data = await resData.json();
        // condition run if zipcode is invalid or incorrect  display a status amessage to user 
        if(data.cod!=200){

            document.getElementById("message").innerText=(data.message);  
             message =()=>{
                return document.getElementById("message").innerText="";
            }
            setTimeout( message,1300)
           // console.log(data.message)    test
        }else{
           // console.log(await data)      test
        return data;
        }
        // display error on console if the function not run successfully
    }catch(error){
        console.log("error",error);
    }
}
//_________________________________________________________________________
// Asynchronous function to select the data that we want to display to the user.
const weatherData = async(data)=>{
           const newData = {
            date:newDate,
            city:data.name,
            temp:data.main.temp ,
            feeling:feeling.value}
    try{
        //console.log(newData); test
        return newData;
    }catch(error){
        console.log("error",error)
    }
}
//______________________________________________________________________________________
//Async function to post the data that we want to save it in server side. to get it later
const postData = async(url="",newdata={})=>{

    try{
        // set up a post route and ask it to feth url that we want to make post to
        const res = await fetch(url,{
         // request type "POST" , 
        method:"POST",
        credentials:"same-origin",
        // on header the app will run on json data.
        headers:{"content-Type":"application/json"},
         // Body data type must match "Content-Type" header        
        body:JSON.stringify(newdata)
    });
        return res;
    }catch(error){
        console.log("error",error)
    }
}
//__________________________________________________________________________________
// async function to get new data we saved it in server side
const getNewData = async (url)=>{
    const data  = await fetch (url);
    try{
        const res = await data.json();
        return res;
    }catch(error){
        console.log("error",error)
    }
}
//__________________________________________________________________________________
// async function to update UI and display the data on browser
const updateUI =async  (data)=>{
    let up = await data;
    console.log(up)      //test final data we need to display it
        date.innerText=`Date : ${up.date}` 
        city.innerText=`city : ${up.city}`
        temp.innerText=`Temp : ${up.temp} °C`
        content.innerText=`Feeling : ${up.feeling}`
         if(up.feeling==""){
            content.innerHTML=`Feeling : How do you feel today ?`
         }
    }
 



    


