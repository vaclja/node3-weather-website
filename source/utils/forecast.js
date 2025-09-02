import request from 'postman-request'

const forecast = (latitude, longitude, callback) =>{
    let url = `http://api.weatherapi.com/v1/current.json?key=b6d98d8555bc4780b6e194239252808&q=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}`;

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Could not reach the weather app server', undefined);
        }
        else if(body.error){
            callback(body.error, undefined);
        }
        else{
            callback(undefined,{ 
                forecast: `${body.current.condition.text}. Temperature is ${body.current.temp_c} Celsius. Humidity is ${body.current.humidity} percent.`,
                icon: body.current.condition.icon
            });
        }
    });
}

export default forecast;