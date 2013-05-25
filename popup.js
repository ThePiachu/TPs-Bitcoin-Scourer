function callback(variable){
	//getting all addresses into one array
	var array = new Array();
	for (var i=0;i<variable.length;i++)
	{
		for (j=0;j<variable[i].length;j++)
		{
			array.push(variable[i][j]);
		}
	}
	//removing duplicates
	var addresses = new Array();
	var toAdd = true;
	
	for (var i=0;i<array.length;i++)
	{
		toAdd=true;
		for (var j=0;j<addresses.length;j++)
		{
			if (array[i]==addresses[j])
			{
				toAdd=false;
			}
		}
		if (toAdd)
		{
			addresses.push(array[i]);
		}
	}
	
	var table=document.getElementById("BitcoinAddresses");
	var tableBody=document.createElement("tbody");
	
	if (addresses.length>0)
	{
		//printing them out
		for (var i=0;i<addresses.length;i++)
		{
			var row=document.createElement("tr");
			var cell=document.createElement("td");
			var cellText=document.createTextNode(addresses[i]);
			cell.appendChild(cellText);
			row.appendChild(cell);
			tableBody.appendChild(row);
		}
	} else {
		//nothing found
		var row=document.createElement("tr");
		var cell=document.createElement("td");
		var cellText=document.createTextNode("No matching addresses found");
		cell.appendChild(cellText);
		row.appendChild(cell);
		tableBody.appendChild(row);
	}
	table.appendChild(tableBody);
	table.setAttribute("border", "2");
}

function handleTabs(tabs){
	for (var i=0;i<tabs.length;i++){
		console.log(tabs[i]);
		chrome.tabs.executeScript(null, {file: "bitcoinjs-min.js"});
		chrome.tabs.executeScript(null, {file: "BitcoinAddress.js"});
		chrome.tabs.executeScript(null, {file: "contentScript.js"}, callback);
	}
}

function scour() {
	chrome.tabs.query({active: true}, handleTabs);
}

scour();