
updateSplits();

async function getEnvs(workspace) {
  let requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  };
  let envs = await fetch(`/envs?&workspace=${workspace}`, requestOptions);
  return envs.json();
}



function makeSelected(option) {
  hideSelected();
  hideMain();
  let navElements = document.querySelectorAll(`[id^=${option}]`);
  navElements.forEach(function (value, index, array) {
    if (value.id == option + "-selected") {
      value.classList.add("selected-option");
    }
    if (value.id == option + "-main") {
      value.classList.remove("hide");
      populateData(option);
    }
  });
}

function populateData(option) {
  if (option == "splits") {
    updateSplits();
  }
  if (option == "segments") {
    updateSegments();
  }
  if (option == "users") {
    updateUsers();
  }
  if (option == "cr") {
    updateCR();
  }
  if (option == "tt") {
    updateTT();
  }
}

function hideSelected() {
  let navElements = document.querySelectorAll("[id$=selected]");
  navElements.forEach((e) => {
    e.classList.remove("selected-option");
  });
}

function hideMain() {
  let navElements = document.querySelectorAll("[id$=main]");
  navElements.forEach((e) => {
    e.classList.add("hide");
  });
}

async function getWorkSpaces() {
  let requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  };
  let workspaces = await fetch("/workspaces", requestOptions);
  return workspaces.json();
}

async function getAllSplits(ws, name) {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  let splits = await fetch(`/splits?workspace=${ws}&offset=0`, requestOptions);

  return [splits.json(), name];
}

function updateSplits() {
  let requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  };
  fetch("/workspaces", requestOptions).then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        status: response.status,
      }))
      .then((res) => {
        //console.log(res.status, res.data.objects);
        //console.log(JSON.stringify(res))
        let workspaces = res.data.objects;
        workspaces.forEach(async (ws) => {
          let requestOptions = {
            method: "GET",
            redirect: "follow",
          };
          let envs = await getEnvs(ws.id)
          fetch(`/splits?workspace=${ws.id}&offset=0`, requestOptions).then(
            (response) =>
              response
                .json()
                .then((data) => ({
                  data: data,
                  status: response.status,
                }))
                .then((res) => {
                  //console.log(res.status, res.data.objects);
                  ////console.log('workspace: '+ws.name)
                  //console.log(typeof res.data.objects);
                  if (
                    typeof res.data.objects == "undefined" ||
                    res.data.objects == null
                  ) {
                    return;
                  }

                  let div = document.getElementById("splits-main");

                  let wsElem = document.createElement("h3");
                  wsElem.innerText = ws.name;

                  div.appendChild(wsElem);

                  let table = document.createElement("table");
                  table.classList = "styled-table";
                  let thead = document.createElement("thead");
                  let headerRow = document.createElement("tr");
                  let h = [
                    "Name",
                    "Description",
                    "RolloutStatus",
                    "Tags",
                    "TrafficType",
                    "Kill or Restore"
                  ];
                  h.forEach((v) => {
                    let headElem = document.createElement("th");
                    headElem.innerText = v;
                    headerRow.appendChild(headElem);
                  });
                  thead.appendChild(headerRow);
                  table.appendChild(thead);
                  let tbod = document.createElement("tbody");
                  res.data.objects.forEach((row) => {
                    let dataRow = document.createElement("tr");

                    let name = document.createElement("td");
                    name.innerHTML = `<a href="https://app.split.io/org/${ORG}/ws/${ws.id}/splits/${row.id}/" target="_blank" rel="noopener noreferrer"> ${row.name} </a>`;
                    dataRow.appendChild(name);

                    let desc = document.createElement("td");
                    desc.innerText = row.description;
                    dataRow.appendChild(desc);

                    let ro = document.createElement("td");
                    ro.innerText =
                      typeof row.rolloutStatus != "undefined"
                        ? row.rolloutStatus.name
                        : "";
                    dataRow.appendChild(ro);

                    let tg = document.createElement("td");
                    tg.innerText =
                      row.tags != null
                        ? row.tags.map((v) => v.name).join(", ")
                        : "";
                    dataRow.appendChild(tg);

                    let tt = document.createElement("td");
                    tt.innerText = row.trafficType.name;
                    dataRow.appendChild(tt);

                    let killAndRestore = document.createElement("td");
                    let buttonsHTML = '';
                    for (let envsIdx = 0; envsIdx < envs.length; envsIdx++) {
                      let env = envs[envsIdx];

                      buttonsHTML +=  `<tr><td> <button class="red-button" onclick="handleKillClick('${ws.id}','${env.id}','${row.name}')">Kill in ${env.name}</button> </td>
                      <td><button class="green-button" onclick="handleRestoreClick('${ws.id}','${env.id}','${row.name}')">Restore in ${env.name}</button></td></tr>`;

                    }
                    killAndRestore.innerHTML = buttonsHTML;
                    dataRow.appendChild(killAndRestore);

                    tbod.appendChild(dataRow);
                  });
                  table.appendChild(tbod);
                  div.appendChild(table);
                })
          );
        });
      })
  );
}

function handleKillClick(ws,env,flagName) {
  // Replace this with your API call logic for "Kill" action
  // Example API call using fetch:
  fetch(`/killFlag?workspace=${ws}&env=${env}&flagName=${flagName}`, {
      method: 'PUT', // or 'GET' or 'PUT', etc.
      headers: {
          'Content-Type': 'application/json'
      },
      // Add any request body data if needed
      body: ''
  })
  .then(response => {return response.json()}).then(json => {
      // Handle the API response here
      if (json.code == null) {
          alert('Kill action was successful.');
      } else {
          alert('Kill action failed.\r\n'+JSON.stringify(json));
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing the Kill action.');
  });
}

// Function to handle the "Restore" button click event
function handleRestoreClick(ws,env,flagName) {
  // Replace this with your API call logic for "Restore" action
  // Example API call using fetch:
  fetch(`/restoreFlag?workspace=${ws}&env=${env}&flagName=${flagName}`, {
      method: 'PUT', // or 'GET' or 'PUT', etc.
      headers: {
          'Content-Type': 'application/json'
      },
      // Add any request body data if needed
      body: ''
  })
  .then(response => {return response.json()}).then(json => {
    // Handle the API response here
    if (json.code == null) {
        alert('Restore action was successful.');
    } else {
        alert('Restore action failed.\r\n'+JSON.stringify(json));
    }
})
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while processing the Restore action.');
  });
}


function updateTT() {
  let requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  };
  fetch("/workspaces", requestOptions).then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        status: response.status,
      }))
      .then((res) => {
        //console.log(res.status, res.data.objects);
        let workspaces = res.data.objects;
        workspaces.forEach((ws) => {
          let requestOptions = {
            method: "GET",
            redirect: "follow",
          };

          fetch(`/tt?workspace=${ws.id}`, requestOptions).then((response) =>
            response
              .json()
              .then((data) => ({
                data: data,
                status: response.status,
              }))
              .then((ttres) => {
                let trafficTypes = ttres.data;
				//console.log("res: "+JSON.stringify(ttres))
				if (ttres.data.code == 404 ) {
					
					return
				}
                let div = document.getElementById("tt-main");

                let wsElem = document.createElement("h3");
                wsElem.innerText = ws.name ;

                div.appendChild(wsElem);

                let table = document.createElement("table");
                table.classList = "styled-table";
                let thead = document.createElement("thead");
                let headerRow = document.createElement("tr");
                let h = ["Name", "Attributes"];
                h.forEach((v) => {
                  let headElem = document.createElement("th");
                  headElem.innerText = v;
                  headerRow.appendChild(headElem);
                });
                thead.appendChild(headerRow);
                table.appendChild(thead);
				//console.log('tt--'+ws.name)
				//console.log(trafficTypes)
                let tbod = document.createElement("tbody");
                trafficTypes.forEach((row) => {
                  fetch(
                    `/attributes?workspace=${ws.id}&tt=${row.id}`,
                    requestOptions
                  ).then((response) =>
                    response
                      .json()
                      .then((data) => ({
                        data: data,
                        status: response.status,
                      }))
                      .then((attres) => {
                        let dataRow = document.createElement("tr");
                        let name = document.createElement("td");
                        name.innerHTML = `<a href="https://app.split.io/org/${ORG}/ws/${ws.id}/admin/traffic-types/${row.id}/properties/" target="_blank" rel="noopener noreferrer"> ${row.name} </a>`
                        dataRow.appendChild(name);
                        let attrs = attres.data;

                        let attr = document.createElement("td");

                        attr.innerText = attrs
                          .map((a) => {
                            return a.id
                          })
                          .join(", ");
                        dataRow.appendChild(attr);
                        tbod.appendChild(dataRow);
                      }).then(() => {
						setTimeout(() => {
							
						}, 5000)
					  }).then(() => {//console.log("tick")
            })
                  );
                });
                if (trafficTypes.length == 0) {
                  let row = document.createElement("tr");
                  let none = document.createElement("td");
                  none.innerText = "No TrafficTypes in this workspace";
                  row.appendChild(none);
                  tbod.appendChild(row);
                }

                table.appendChild(tbod);
                div.appendChild(table);
              })
          );
        });
      })
  );
}



function updateUsers() {
  let requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  };
  fetch("/workspaces", requestOptions).then((response) =>
  response
    .json()
    .then((data) => ({
      data: data,
      status: response.status,
    }))
    .then((ws) => {
  fetch("/users", requestOptions).then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        status: response.status,
      }))
      .then((res) => {
        //console.log(res.status, res.data.data);
        let users = res.data.data;

        fetch(`/groups?offset=0`, requestOptions).then((response) =>
          response
            .json()
            .then((data) => ({
              data: data,
              status: response.status,
            }))
            .then((res) => {
              //console.log(res.status, res.data.objects);

              if (
                typeof res.data.objects == "undefined" ||
                res.data.objects == null
              ) {
                return;
              }
              let groups = res.data.objects;
              let div = document.getElementById("users-main");

              let usersTitle = document.createElement("h3");
              usersTitle.innerText = "Users";

              

              let table = document.createElement("table");
              table.classList = "styled-table";
              let thead = document.createElement("thead");
              let headerRow = document.createElement("tr");
              let h = ["Name", "E-Mail", "Status", "2FA", "Groups"];
              h.forEach((v) => {
                let headElem = document.createElement("th");
                headElem.innerText = v;
                headerRow.appendChild(headElem);
              });
              thead.appendChild(headerRow);
              table.appendChild(thead);
              let tbod = document.createElement("tbody");
              users.forEach((row) => {
                let dataRow = document.createElement("tr");

                let name = document.createElement("td");
                name.innerText = row.name;
                dataRow.appendChild(name);

                let email = document.createElement("td");
                email.innerText = row.email;
                dataRow.appendChild(email);

                let status = document.createElement("td");
                status.innerText = row.status;
                dataRow.appendChild(status);

                let tfa = document.createElement("td");
                tfa.innerText = row["2fa"];
                dataRow.appendChild(tfa);

                let userGroups = document.createElement("td");
                userGroups.innerText =
                  row.groups != null
                    ? row.groups
                        .map((v) => groups.filter((g) => v.id == g.id)[0].name)
                        .join(", ")
                    : "";
                dataRow.appendChild(userGroups);

                tbod.appendChild(dataRow);
              });

              table.appendChild(tbod);
              

              let groupsTitle = document.createElement("h3");
              groupsTitle.innerText = "Groups";

              div.appendChild(groupsTitle);

              let groupTable = document.createElement("table");
              groupTable.classList = "styled-table";
              let groupThead = document.createElement("thead");
              let groupHeader = document.createElement("tr");
              let gh = ["Name", "Description"];
              gh.forEach((v) => {
                let headElem = document.createElement("th");
                headElem.innerText = v;
                groupHeader.appendChild(headElem);
              });
              groupThead.appendChild(groupHeader);
              groupTable.appendChild(groupThead);
              let groupTbod = document.createElement("tbody");
              groups.forEach((row) => {
                let dataRow = document.createElement("tr");

                let name = document.createElement("td");
                name.innerHTML = `<a href="https://app.split.io/org/${ORG}/ws/${ws.data.objects[0].id}/admin/groups/details/${row.id}/" target="_blank" rel="noopener noreferrer"> ${row.name} </a>`;
                dataRow.appendChild(name);

                let desc = document.createElement("td");
                desc.innerText = row.description;
                dataRow.appendChild(desc);

                groupTbod.appendChild(dataRow);
              });

              groupTable.appendChild(groupTbod);
              div.appendChild(groupTable);

              // users come after the groups
              div.appendChild(usersTitle);
              div.appendChild(table);
            })
        );
      })
  );
}
    )
  )
}


function updateCR() {
  let requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    redirect: "follow",
  };
  fetch("/workspaces", requestOptions).then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        status: response.status,
      }))
      .then((res) => {
        //console.log(res.status, res.data.objects);
        let workspaces = res.data.objects;
        workspaces.forEach((ws) => {
          let requestOptions = {
            method: "GET",
            redirect: "follow",
          };

          fetch(`/envs?workspace=${ws.id}`, requestOptions).then((response) =>
            response
              .json()
              .then((data) => ({
                data: data,
                status: response.status,
              }))
              .then((envs) => {
                //console.log(envs.status, envs.data);
				if(envs.data.code == 404) {
					return
				}
                envs.data.forEach((env) => {
                  let div = document.getElementById("cr-main");

                  fetch(`/cr?env=${env.id}`, requestOptions).then((response) =>
                    response
                      .json()
                      .then((data) => ({
                        data: data,
                        status: response.status,
                      }))
                      .then((crs) => {
                        let crenv = document.createElement("h3");
                        crenv.innerText = ws.name + ": " + env.name;
                        div.appendChild(crenv);
                        let crdata = crs.data.data;
						//console.log(crdata)
                        let table = document.createElement("table");
                        table.classList = "styled-table";
                        let thead = document.createElement("thead");
                        let headerRow = document.createElement("tr");
                        let h = [
                          "Type",
                          "Name",
                          "Operation",
                          "Status",
                          "Title",
                          "Comments",
                          "Approvers",
                        ];
                        h.forEach((v) => {
                          let headElem = document.createElement("th");
                          headElem.innerText = v;
                          headerRow.appendChild(headElem);
                        });
                        thead.appendChild(headerRow);
                        table.appendChild(thead);
                        let tbod = document.createElement("tbody");
						div.appendChild(table)
						if (typeof crdata == 'undefined' || crdata.length == 0) {
							let row = document.createElement("tr");
							let none = document.createElement("td");
							none.innerText = "No Change Requests in this Environment";
							row.appendChild(none);
							tbod.appendChild(row);
						  } else {
                        crdata.forEach((row) => {
                          let dataRow = document.createElement("tr");
                          let typeOfRow =
                            row.split == null ? "Segment" : "Split";
                          let type = document.createElement("td");
                          type.innerText = typeOfRow;
                          dataRow.appendChild(type);

                          let name = document.createElement("td");
                          name.innerHTML =
                            typeOfRow == "Split"
                              ? `<a href="https://app.split.io/org/${ORG}/ws/${ws.id}/splits/${row.split.id}/env/${env.id}/changeRequest/${row.id}/" target="_blank" rel="noopener noreferrer"> ${row.split.name} </a>`
                              : `<a href="https://app.split.io/org/${ORG}/ws/${ws.id}/splits/${row.segment.id}/env/${env.id}/changeRequest/${row.id}/" target="_blank" rel="noopener noreferrer"> ${row.segment.name} </a>`;
                          dataRow.appendChild(name);

                          let op = document.createElement("td");
                          op.innerText = row.operationType;
                          dataRow.appendChild(op);

                          let stat = document.createElement("td");
                          stat.innerText = row.status;
                          dataRow.appendChild(stat);

                          let title = document.createElement("td");
                          title.innerText = row.title;
                          dataRow.appendChild(title);

                          let comments = document.createElement("td");
                          comments.innerText = row.comments.map(c => c.user+": "+c.comment+"\n role: "+c.role+"\n timestamp: "+ new Date(c.timestamp).toLocaleDateString() +" " + new Date(c.timestamp).toLocaleTimeString()).join('\n\n');
                          dataRow.appendChild(comments);

                          let approvers = document.createElement("td");
                          approvers.innerText = row.approvers.join(", ");
                          dataRow.appendChild(approvers);

                          tbod.appendChild(dataRow);
                        });

					}
						table.appendChild(tbod);
						div.appendChild(table);
                      })
                  );
                });
              })
          );
        });
      })
  );
}


function updateSegments() {
	let requestOptions = {
	  method: "GET",
	  headers: {
		Accept: "application/json",
	  },
	  redirect: "follow",
	};
	fetch("/workspaces", requestOptions).then((response) =>
	  response
		.json()
		.then((data) => ({
		  data: data,
		  status: response.status,
		}))
		.then((res) => {
		  //console.log(res.status, res.data.objects);
		  let workspaces = res.data.objects;
		  workspaces.forEach((ws) => {
			let requestOptions = {
			  method: "GET",
			  redirect: "follow",
			};
  
			fetch(`/segments?workspace=${ws.id}&offset=0`, requestOptions).then(
			  (response) =>
				response
				  .json()
				  .then((data) => ({
					data: data,
					status: response.status,
				  }))
				  .then((res) => {
					//console.log(res.status, res.data.objects);
					////console.log('workspace: '+ws.name)
					//console.log(typeof res.data.objects);
					if (
					  typeof res.data.objects == "undefined" ||
					  res.data.objects == null
					) {
					  return;
					}
  
					let div = document.getElementById("segments-main");
  
					let wsElem = document.createElement("h3");
					wsElem.innerText = ws.name;
  
					div.appendChild(wsElem);
  
					let table = document.createElement("table");
					table.classList = "styled-table";
					let thead = document.createElement("thead");
					let headerRow = document.createElement("tr");
					let h = [
					  "Name",
					  "Description",
					  "Creation Time",
					  "Tags",
					  "TrafficType",
					];
					h.forEach((v) => {
					  let headElem = document.createElement("th");
					  headElem.innerText = v;
					  headerRow.appendChild(headElem);
					});
					thead.appendChild(headerRow);
					table.appendChild(thead);
					let tbod = document.createElement("tbody");
					res.data.objects.forEach((row) => {
					  let dataRow = document.createElement("tr");
					  let name = document.createElement("td");
					  name.innerHTML = name.innerHTML = `<a href="https://app.split.io/org/${ORG}/ws/${ws.id}/segments/" target="_blank" rel="noopener noreferrer"> ${row.name} </a>`;
					  //name.inner
            dataRow.appendChild(name);
  
					  let desc = document.createElement("td");
					  desc.innerText = row.description;
					  dataRow.appendChild(desc);
  
					  let t = document.createElement("td");
					  t.innerText =
						"" +
						new Date(row.creationTime).toLocaleDateString() +
						" " +
						new Date(row.creationTime).toLocaleTimeString();
					  dataRow.appendChild(t);
  
					  let tg = document.createElement("td");
					  tg.innerText =
						row.tags != null
						  ? row.tags.map((v) => v.name).join(", ")
						  : "";
					  dataRow.appendChild(tg);
  
					  let tt = document.createElement("td");
					  tt.innerText = row.trafficType.name;
					  dataRow.appendChild(tt);
  
					  tbod.appendChild(dataRow);
					});
					if (res.data.objects.length == 0) {
					  let row = document.createElement("tr");
					  let none = document.createElement("td");
					  none.innerText = "No Segments in this workspace";
					  row.appendChild(none);
					  tbod.appendChild(row);
					}
  
					table.appendChild(tbod);
					div.appendChild(table);
				  })
			);
		  });
		})
	);
  }
                 
 
					