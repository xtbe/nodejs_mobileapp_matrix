const axios = require('axios');
require('dotenv').config();

var projects = require('./data/projects')

projects.ids.forEach(project =>  {
  console.log("Processing " + project +  "...");
  var apiRequesURL = createAPIrequest(project);
  console.log(apiRequesURL);
  processProject(apiRequesURL)
})


function createAPIrequest(projectID) {
  
  var url = process.env.GET_REPO_CONTENTS_API.replace("PROJECTID",projectID);
  url += "?" + process.env.PRIVATE_TOKEN_PARAMETER + process.env.PERSONAL_ACCESS_TOKEN

  return url;
}

function processProject(url) {

  axios.get(url).then(resp => {

    var jsonResponse = resp.data;

    jsonResponse.forEach(element => {

      if (element.type === "tree") {
      
        console.log("Id:" + element.id);
        console.log("Name:" + element.name);
        console.log("Type:" + element.type);

      }
    });
});

}

