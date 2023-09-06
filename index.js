const enVars = require("dotenv").config().parsed;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

const ADMIN_API_KEY = enVars.API_KEY;
const ORG_ID = enVars.ORG_ID;

const DEBUG = false;

app.get("/envs", (req, outRes) => {
    let workspace =  req.query.workspace;
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: `/internal/api/v2/environments/ws/${workspace}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });

app.get("/workspaces", (req, outRes) => {
  var options = {
    method: "GET",
    hostname: "api.split.io",
    path: "/internal/api/v2/workspaces",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ADMIN_API_KEY}`,
    },
    maxRedirects: 20,
  };
  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      outRes.send(JSON.parse(body.toString()));
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });
  req.end();
});

app.get("/splitDefs", (req, outRes) => {
    let workspace =  req.query.workspace;
    let offset =  req.query.offset;
    let env =  req.query.environment;
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: `/internal/api/v2/splits/ws/${workspace}/environments/${env}?offset=${offset}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) {console.log(options.path)}
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if ( DEBUG) {console.log(body.toString())};
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });

  app.get("/segmentDefs", (req, outRes) => {
    let workspace =  req.query.workspace;
    let offset =  req.query.offset;
    let env =  req.query.environment;
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: `/internal/api/v2/segments/ws/${workspace}/environments/${env}?offset=${offset}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) {console.log(options.path)}
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if ( DEBUG) {console.log(body.toString())};
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });


app.get("/splits", (req, outRes) => {
    let workspace =  req.query.workspace;
    let offset =  req.query.offset;
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: `/internal/api/v2/splits/ws/${workspace}?offset=${offset}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) {console.log(options.path)};
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if (DEBUG) { console.log(body.toString())}
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });

  app.get("/segments", (req, outRes) => {
    let workspace =  req.query.workspace;
    let offset =  req.query.offset;
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: `/internal/api/v2/segments/ws/${workspace}?offset=${offset}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) { console.log(options.path)}
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if (DEBUG) { console.log(body.toString())}
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });


  app.get("/users", (req, outRes) => {
    let next =  req.query.next;
    if (DEBUG) { console.log('next= '+next)}
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: typeof next != 'undefined' ? `/internal/api/v2/users?after=${next}` : `/internal/api/v2/users`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) {  console.log(options.path) }
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if (DEBUG) { console.log(body.toString())};
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });

  app.get("/groups", (req, outRes) => {
    let offset =  req.query.offset;

    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: `/internal/api/v2/groups?offset=${offset}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) { console.log(options.path)}
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if (DEBUG) { console.log(body.toString())}
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });


  app.get("/cr", (req, outRes) => {
    let next =  req.query.next;
    let env = req.query.env
    if (DEBUG) { console.log('next= '+next)}
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: typeof next != 'undefined' ? `/internal/api/v2/changeRequests?after=${next}&environmentId=${env}` : `/internal/api/v2/changeRequests?environmentId=${env}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) { console.log(options.path)}
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
       if (DEBUG) {console.log(body.toString())}
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });


  app.get("/tt", (req, outRes) => {
    let workspace =  req.query.workspace;
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path: `/internal/api/v2/trafficTypes/ws/${workspace}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });

  app.get("/attributes", (req, outRes) => {
    let workspace = req.query.workspace
    let tt= req.query.tt
    var options = {
      method: "GET",
      hostname: "api.split.io",
      path:  `/internal/api/v2/schema/ws/${workspace}/trafficTypes/${tt}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) { console.log(options.path)};
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if (DEBUG) { console.log(body.toString())};
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });


  app.put("/killFlag", (req, outRes) => {
    let workspace = req.query.workspace
    let env= req.query.env;
    let flagName = req.query.flagName
    var options = {
      method: "PUT",
      hostname: "api.split.io",
      path:  `/internal/api/v2/splits/ws/${workspace}/${flagName}/environments/${env}/kill`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) { console.log(options.path)};
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if (DEBUG) { console.log(body.toString())};
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });

  app.put("/restoreFlag", (req, outRes) => {
    let workspace = req.query.workspace
    let env= req.query.env;
    let flagName = req.query.flagName
    var options = {
      method: "PUT",
      hostname: "api.split.io",
      path:  `/internal/api/v2/splits/ws/${workspace}/${flagName}/environments/${env}/restore`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_API_KEY}`,
      },
      maxRedirects: 20,
    };
    if (DEBUG) { console.log(options.path)};
    var req = https.request(options, function (res) {
      var chunks = [];
  
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
  
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        if (DEBUG) { console.log(body.toString())};
        outRes.send(JSON.parse(body.toString()));
      });
  
      res.on("error", function (error) {
        console.error(error);
      });
    });
    req.end();
  });


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {org: ORG_ID});
});

app.listen(3500, () => {
  console.log("server started on port 3500");
});
