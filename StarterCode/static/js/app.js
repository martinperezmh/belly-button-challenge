const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

//Use D3 to select the dropdown menu
ds.select("#selDataset");

 //Use D3 to get sample names
ds.json(url).then((data)) => {
    //Set a variable for sample names
    let names = data.names;

    //Add to drop down
    names.array.forEach(id => {
        // Log value of each iteration for every id loop
        console.log(id);
    });
}


//Use D3 to select the dropdown menu
let dataset = dropdownMenu.property("value");
    
//Initialize x and y arrays
let x: slicedData.map;
let y: slicedData.map;
//type: "bar" 
    
}