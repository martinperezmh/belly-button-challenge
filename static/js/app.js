// Read in the JSON data from URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function infoBox(sample){
    d3.json(url).then(function(data){
        // Assign all metadata to metaData
        let metaData = data.metadata;
        // Find the array of matching sample number to id
        let metaSampleMatch = metaData.filter(match => match.id == sample);
        
        // Access the data within the array
        let metaSampleData = metaSampleMatch[0];

        // clear the metadata out
        d3.select("#sample-metadata").html("");

        // Get the key/value pair and display in the info box
        Object.entries(metaSampleData).forEach(([key,value])=>{d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);});
        });
};


// Create function for the bar chart of Top 10 OTUs found in that individual
function barChart(sample){
    d3.json(url).then(function(data){
        // Assign all samples to sampleData
        let sample1 = data.samples;

        // Find the array of matching sample number to id
        let sampleMatch = sample1.filter(match=> match.id == sample);

        // Access the data within the array
        let match = sampleMatch[0];

        // Create variables for otu_ids, otu_labels, and sample_values
        let otu_ids = match.otu_ids;
        let otu_labels = match.otu_labels;
        let sample_values = match.sample_values;

        // Slice the first 10
        let yTicks = otu_ids.slice(0,10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0,10);
        let textLabels = otu_labels.slice(0,10);

        // Set up bar chart
        let barChart = {
            x: xValues.reverse(),
            y: yTicks.reverse(),
            text: textLabels.reverse(),
            type:"bar",
            orientation: "h"
        };
        // Plot the bar chart
        Plotly.newPlot("bar",[barChart])

    });
};

// Create function for the bubble chart
function bubbleChart(sample){
    d3.json(url).then(function(data){
        // Assign all samples to sampleData
        let sample2 = data.samples;

        // Find the array of matching sample number to id
        let sampleMatch = sample2.filter(match=> match.id == sample);

        // Access the data within the array
        let match = sampleMatch[0];

        // Assign values to otu_ids, otu_labels, and sample_values
        let otu_ids = match.otu_ids;
        let otu_labels = match.otu_labels;
        let sample_values = match.sample_values;
        
        // Set up the bubble chart
        let bubbleChart = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker:{
                size: sample_values,
                color: otu_ids,
                colorscale: "earth"
            },
            text: otu_labels
        };
        // Set up the layout
        let layout = {
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };
        // Plot the bubble chart
        Plotly.newPlot("bubble", [bubbleChart],layout)
    });

};

function init(){
    let select = d3.select("#selDataset");
    // Find the sample names 
    d3.json(url).then(function(data){
        let sample_Names = data.names;
        sample_Names.forEach((sample)=>{
            select.append("option").text(sample).property("value",sample);
        });
        // default sample
        let sample = sampleNames[0];
        infoBox(sample);
        barChart(sample);
        bubbleChart(sample);
    })
};

// Create function to update the dashboard
function optionChanged(item)
{
     // call the function to build the demographics box
    infoBox(item);

    // call the function to build the bar chart
    barChart(item);

    // call the function to build the bubble chart
    bubbleChart(item);

    // call the function to build the gauge chart
    gaugeChart(item);
}

// call the initialize function
init();