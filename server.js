var express = require("express")
var path = require("path")
var moment = require("moment")

var app = express()

app.use(express.static(__dirname + '../public'))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug')

function getNaturalTime(time) {
    return moment(time).format("MMMM DD, YYYY")
}

function getUnixTime(time) {
    return moment(time).unix()
}


app.get('/', (req, res) => {
    res.render('index', { title: 'Baron_timestamp_api_project' })
})

app.get('/:date', (req, res) => {
    var queryStr = req.params.date
    console.log(typeof(queryStr), queryStr)
    
    var results = {
        unix: null,
        natural: null
    }
    
    function validDate(moment) {
        if ( moment.isValid() ) {
            results.natural = getNaturalTime(date)
            results.unix = getUnixTime(date)
        } else {
            return
        }
        
    }
    
    // Check to see if query only contains digits
    var date = ""
    if ( /^[\d]*$/.test(queryStr) ) {
        date = moment(+queryStr*1000)   // Convert the timestamp to milleseconds
        validDate(date)
        res.end(JSON.stringify(results))
    // Otherwise it contains letters
    } else {
        date = moment(queryStr)
        validDate(date)
        res.end(JSON.stringify(results))
    }

})

app.listen(8080, () => {
    console.log("You are listening to port 8080...")
})
