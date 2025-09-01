import request from 'postman-request';

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+encodeURIComponent(address)+'&access_token=pk.eyJ1IjoicmV3aXRhYmxlIiwiYSI6ImNtZTYxYTh2dTBheXYyaXNiaXMyOGhpdjQifQ.cBfLG4mo2ho9PS-iClsXSA'
    request({url, json:true}, (error, {body}) =>{

        if(error){
            callback('Unable to connect to web services', undefined);
        }
        else if(body.features.length === 0){
            callback('No cities found, try another search', undefined);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.full_address
            })
        }
    })
}

export default geocode;