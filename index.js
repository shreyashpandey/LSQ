const express = require('express');
const app = express();
const request = require('request');
app.use(express.static('files'));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
});
app.post('/', function (req, res) {
  let fName = req.body.fname;
  let phone = req.body.phone;
  let eMail = req.body.email;
  console.log('Posted!', fName, phone, eMail);
  let body = [
    {
      'Attribute': 'FirstName',
      'Value': fName,
    },
    {
      'Attribute': 'EmailAddress',
      'Value': eMail,
    },
    {
      'Attribute': 'Phone',
      'Value': phone,
    },
    {
      'Attribute': 'SearchBy',
      'Value': 'EmailAddress',
    },
  ];

  var options = {
    url:
      'https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$r66ccc51c6b565c973085e79cf510d0af&secretKey=15109006ef923b1931a4dc7ea7b981a093828941',
    method: 'POST',
    body: body,
    headers: {
      'content-type': 'application/json',
    },
    json: true,
  };

  request(options, function (error, response, body) {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + '/failure.html');
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + '/success.html');
        //console.log(response.statusCode);
        console.log(response.body);
      } else {
        res.sendFile(__dirname + '/failure.html');
      }
    }
  });
});
app.get('/prospect',function(req,res)
{
  res.sendFile(__dirname+ '/getprospect.html');
});
app.get('/task',(req,res)=>{
  res.sendFile(__dirname+'/posttask.html');
});
app.post('/task',(req,res)=>{
  let n1=req.body.task+" "+req.body.n1;
  let d1=req.body.d1;
  let re=req.body.re;
  let nb=req.body.nb;
  let task=req.body.task;
  let oem=req.body.oem;
  let body={
    "Name": n1,
    "Description": d1,
    "RelatedEntity": 0,
    "RelatedEntityId": "",
    "DueDate": "2020-07-28 10:30:00",
    "EndDate": "2020-07-28 10:45:00",
    "Reminder": re,
    "NotifyBy": nb,
    "OwnerEmailAddress": oem,
    "TaskType": {
        "Name": task
    }
};
var options2 = {
  url:
    'https://api-in21.leadsquared.com/v2/Task.svc/Create?accessKey=u$r66ccc51c6b565c973085e79cf510d0af&secretKey=15109006ef923b1931a4dc7ea7b981a093828941',
  method: 'POST',
  body: body,
  headers: {
    'content-type': 'application/json',
  },
  json: true,
};

request(options2, function (error, response, body) {
  if (error) {
    console.log(error);
    res.sendFile(__dirname + '/failure.html');
  } else {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + '/success.html');
      //console.log(response.statusCode);
      console.log(response.body);
    } else {
      res.sendFile(__dirname + '/failure.html');
    }
  }
});

});
app.get('/candlactivity',(req,res)=>{
  res.sendFile(__dirname+'/candlactivity.html');
});
app.post('/candlactivity',(req,res)=>
{
  let fn=req.body.fname;
  let ln=req.body.lname;
  let email=req.body.email;
  let hosp=req.body.hosp;
  let specs=req.body.specs;
  let date=req.body.d1;
  let time=req.body.t1;
  let dt=date+' '+time+':00';
  let body1={
    "LeadDetails": [
        {
            "Attribute": "EmailAddress",
            "Value": email
        },
        {
        "Attribute": "FirstName",
        "Value": fn
        },
        {
            "Attribute": "LastName",
            "Value": ln
          },
        {
            "Attribute": "mx_City",
            "Value": "Bangalore"
        },
        {
            "Attribute": "SearchBy",
            "Value": "EmailAddress"
        }
    ],
    "Activity": {
        "ActivityEvent": 153,
        "ActivityNote": "Note for the activity",
        "ActivityDateTime": date+' '+time+':00',
        "Fields": [
            {
                "SchemaName": "mx_Custom_1",
                "Value": hosp
            },
            {
                "SchemaName": "mx_Custom_2",
                "Value": specs
            },
            {
                "SchemaName": "mx_Custom_3",
                "Value": dt
            }
        ]
    }
};
console.log(body1);
var options3 = {
  url:
    'https://api-in21.leadsquared.com/v2/ProspectActivity.svc/CreateCustom?accessKey=u$r66ccc51c6b565c973085e79cf510d0af&secretKey=15109006ef923b1931a4dc7ea7b981a093828941',
  method: 'POST',
  body: body1,
  headers: {
    'content-type': 'application/json',
  },
  json: true,
};
//console.log(options3);
request(options3, function (error, response, body) {
  if (error) {
    console.log(error);

    //console.log(response);
    //res.sendFile(__dirname + '/failure.html');
  } else {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + '/success.html');
      console.log(body1["Activity"]['Fields'][0]["Value"]);
      //console.log(response.statusCode);
      //console.log(response.body1);
    } else {
      //res.sendFile(__dirname + '/failure.html');
      console.log(error);
      //console.log(response);
    }
  }
});
});

app.get('/activity',function(req,res)
{
  res.sendFile(__dirname+'/postactivity.html');
});
app.post('/activity',function(req,res)
{
  let rpi=req.body.rpi;
  let an=req.body.an;
  let ae=req.body.ae;
  console.log('Posteddd');
  let body={
    "RelatedProspectId": rpi,
    "ActivityEvent": ae,
    "ActivityNote": an,
    "ActivityDateTime": "2020-07-24 12:13:44",
    "Fields": [
        {
            "SchemaName": "mx_Custom_1",
            "Value": "123123123"
        },
        {
            "SchemaName": "mx_Custom_2",
            "Value": "123"
        },
        {
            "SchemaName": "mx_Custom_3",
            "Value": "3"
        },
        {
            "SchemaName": "mx_Custom_4",
            "Value": "4"
        },
        {
            "SchemaName": "mx_Custom_5",
            "Value": "2016-07-07 10:55:00"
        },
        {
            "SchemaName": "mx_Custom_6",
            "Value": "Value for Custom field"
        },
        {
            "SchemaName": "mx_Custom_7",
            "Value": "Value for Custom field"
        },
        {
            "SchemaName": "mx_Custom_8",
            "Value": "1"
        },
        {
            "SchemaName": "mx_Custom_9",
            "Value": "Value for Custom field"
        },
        {
            "SchemaName": "mx_Custom_10",
            "Value": ""
        },
        {
            "SchemaName": "mx_Custom_11",
            "Value": ""
        },
        {
            "SchemaName": "mx_Custom_12",
            "Value": ""
        },
        {
            "SchemaName": "mx_Custom_13",
            "Value": "Value for Custom field"
        },
        {
            "SchemaName": "mx_Custom_14",
            "Value": "Value for Custom field"
        },
        {
            "SchemaName": "mx_Custom_15",
            "Value": "asd"
        }
    ]
};
var options1 = {
  url:
    'https://api-in21.leadsquared.com/v2/ProspectActivity.svc/Create?accessKey=u$r66ccc51c6b565c973085e79cf510d0af&secretKey=15109006ef923b1931a4dc7ea7b981a093828941',
  method: 'POST',
  body: body,
  headers: {
    'content-type': 'application/json',
  },
  json: true,
};

request(options1, function (error, response, body) {
  if (error) {
    console.log(error);
    res.sendFile(__dirname + '/failure.html');
  } else {
    if (response.statusCode == 200) {
      res.sendFile(__dirname + '/success.html');
      //console.log(response.statusCode);
      console.log(response.body);
    } else {
      res.sendFile(__dirname + '/failure.html');
    }
  }
});
});



app.listen(3000, function () {
  console.log('Server is running at port 3000');
});
