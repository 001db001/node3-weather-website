const request = require('request');




const forecast = (longitude, latitude, callback) => {

    // const url = 'https://api.darksky.net/forecast/c2185a1e5992432042469c5e1b3f0c85/42.3605,-71.0596?units=si&lang=hr'
    // const url = 'https://'
    const url = 'https://api.darksky.net/forecast/c2185a1e5992432042469c5e1b3f0c85/' + latitude + ',' + longitude + '?units=si'

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            // callback(undefined, {
            //     summary: response.body.daily.data[0].summary,
            //     temp: response.body.currently.temperature,
            //     precipProb: (response.body.currently.precipProbability) * 100
            // })

            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${(body.currently.precipProbability)*100}% chance of rain`)
        }
    })
}


module.exports = forecast