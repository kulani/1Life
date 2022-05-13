var lookup = require('./modules/lookup');
var sentences = require('./modules/sentense');
var service = require('./services/operationService');


var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { route } = require('express/lib/application');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response, next)=>{
    console.log('middleware');
    next();
})
router.route('/types').get((request,response)=>{
    
service.GetAllTypes().then(result =>{
   response.json(result[0]);
})

})
router.route('/sentences').get((request,response)=>
{   
    service.GetAllSentense().then(result =>{
       response.json(result[0]);
    })   
})
router.route('/sentences').post((request,response)=>
{   
    let insert = {...request.body}
    service.AddSentense(insert).then(result =>{
       response.status(201).json(result);
    })   
})


var port = process.env.PORT || 8090;
app.listen(port);
console.log('1Life API is runnning at ' + port);