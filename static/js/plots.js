// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as "data"

async function buildPlot(){
  let data = await d3.json("../static/js/athletes.json");
		
	let Sport = data.map(data => data.Sport);
	let Earnings = data.map(data => data["earnings ($ million)"]);
		 	
	// Create your trace.
  let trace = {
    x: Sport,
    y: Earnings,
    type: "bar"
	};

  // Create the data array for our plot
  let trace1 = [trace];

  // Define the plot layout
  let layout = {
    title: "Forbes Richest by Year/Category",
    xaxis: { title: "Sport 1991-2019" },
    yaxis: { title: "Earnings in $ Millions"}
	
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", trace1, layout);
				
};

// Build default plot when page opens
buildPlot();

// Save category for default plot which is based on Sport 
var category = "Sport";

// When date selection changes, update chart
function changeDate(){
		if (category == "Nationality"){
			changeNationality();
		} else if (category == "Name"){
			changeName();
		}	else {
			changeSport();
		};
};


async function changeName(){
	
	// Select the Date element and get the raw HTML node
  var dateElement = d3.select("#date");
  var dateValue = dateElement.property("value");

	// Get Data for all years
	if (dateValue === "ALL"){
		let dataName = await d3.json("../static/js/athletes.json");
		let Name = dataName.map(dataName => dataName.Name);
		
		// Update chart
		var update = {
				xaxis: { title: "Names 1991-2019" } // updates the title		
		};
		Plotly.relayout("plot", update);
		Plotly.restyle("plot", "x", [Name]);	
	} else {
		let dataName = await d3.json("../static/js/athletes.json");
		let data = dataName.filter(dataName => dataName.Year === parseInt(dateValue));  // Filter data on selected year
		let Name = data.map(data => data.Name);
		
		// Update chart
		var update = {
				xaxis: { title: "Names " + dateValue } // updates the title		
		};
		Plotly.relayout("plot", update);		
		Plotly.restyle("plot", "x", [Name]);	
	};
	
	// Save last chart category
	category = "Name"
};



async function changeSport(){
	
	// Select the Date element and get the raw HTML node
  var dateElement = d3.select("#date");
  var dateValue = dateElement.property("value");
	
	// Get data for all years
	if (dateValue === "ALL"){
		let dataSport = await d3.json("../static/js/athletes.json");
		let Sport = dataSport.map(dataSport => dataSport.Sport);
		
		// update chart
		var update = {
				xaxis: { title: "Sport 1991-2019" } // updates the title		
		};
		Plotly.relayout("plot", update);		
		Plotly.restyle("plot", "x", [Sport]);	
	} else {
		let dataSport = await d3.json("../static/js/athletes.json");
		let data = dataSport.filter(dataSport => dataSport.Year === parseInt(dateValue)); // Filter data on selected year
		let Sport = data.map(data => data.Sport);
		
		// Update chart
		var update = {
				xaxis: { title: "Sport " + dateValue } // updates the title		
		};
		Plotly.relayout("plot", update);		
		Plotly.restyle("plot", "x", [Sport]);	
	};
	
	// Save last chart category
	category = "Sport"
};

async function changeNationality(){
	
	// Select the Date element and get the raw HTML node
  var dateElement = d3.select("#date");
  var dateValue = dateElement.property("value");
		
	// Get data	for all years
	if (dateValue === "ALL"){
		let dataNationality = await d3.json("../static/js/athletes.json");
		let Nationality = dataNationality.map(dataNationality => dataNationality.Nationality);
		
		// Update chart
		var update = {
				xaxis: { title: "Nationality 1991-2019" } // updates the title		
		};
		Plotly.relayout("plot", update);		
		Plotly.restyle("plot", "x", [Nationality]);	
	} else {
		let dataNationality = await d3.json("../static/js/athletes.json");
		let data = dataNationality.filter(dataNationality => dataNationality.Year === parseInt(dateValue)); // Filter data on selected year
		let Nationality = data.map(data => data.Nationality);
		
		// Update chart
		var update = {
				xaxis: { title: "Nationality " + dateValue } // updates the title		
		};
		Plotly.relayout("plot", update);		
		Plotly.restyle("plot", "x", [Nationality]);	
	};
	
	// Save last chart category
	category = "Nationality"
};




