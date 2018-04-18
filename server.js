const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

// Middlewares 
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// Handlebars Helpers 
hbs.registerHelper('getFullYear', () => new Date().getFullYear());
// Helper with argument
hbs.registerHelper('transToUpperCase', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {

    let log = `${new Date().toString()}: ${req.method} ${req.url}`

    fs.appendFile('activity.log', log + '\n', (err) => {
        if(err) {
            console.log(err);
        }
    })

    next();
})

// If page is render and next is not called, it will render the page at all time.

// app.use((req, res, next) => {
//     res.render('maintenance')
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home | Web Design',
        message: 'Welcome to Homepage'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        message: 'Welcome to About Page'
    })
})

app.get('/projects', (req, res) => {
    res.render('project', {
        title: 'Project Page',
        message: 'Welcome to Projects Page'
    })
})



let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})