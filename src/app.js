/* #region  node & npm require */
const path = require('path');
const express = require('express')
const hbs = require('hbs')


const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

/* #endregion */

var app = express();
const port = process.env.PORT || 3000;


/* #region  Define paths for Express config */
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/* #endregion */

/* #region  Setup Handlebars engine and views location */
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

/* #endregion */

/* #region  Setup static directiory to serve */
app.use(express.static(publicDirectoryPath))
/* #endregion */


/* #region  Index.hbs */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Dino'
    })
})
/* #endregion */

/* #region  About.hbs */

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dino'
    })
})
/* #endregion */

/* #region  Help.hbs */

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'message for help page',
        title: 'Help',
        name: 'Dino'
    })
})
/* #endregion */

/* #region  Weather json */
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to set address'
        })
    }


    geocode(req.query.address.toString(), (error, {
        cityName,
        longitude,
        latitude
    } = {}) => {

        if (error) {
            return res.send({
                error
            })
        }

        // console.log('City: ' + data.cityName + '\nlatitude: ' + data.latitude + '\nlongitude: ' + data.longitude);

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                cityName,
                forecastData,
                address: req.query.address,
                longitude,
                latitude
            })

        })


    })

})
/* #endregion */

/* #region  Products */
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    console.log(req.query.ratings);


    res.send({
        products: []
    })
    /* #region   */
    // res.render('404', {
    //     message: 'Page not found',
    //     title: '404',
    //     name: 'Dino'
    // })
    /* #endregion */
})
/* #endregion */

/* #region  Help 404 */
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: 'Help',
        name: 'Dino'
    })
})
/* #endregion */

/* #region  * 404 */
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Dino'
    })
})
/* #endregion */

app.listen(port, () => {
    console.log('Server is up on port '+ port);
});