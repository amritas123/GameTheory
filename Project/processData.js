	//-------------------------------------------
	// process raw data
	//-------------------------------------------

	data = processData();
	function processData(){

		console.log("Inside processData()");
		
		var color="rgba(255, 0, 0, .4)";
		console.log("color="+color);
			
		// order by vehicleID and secondsPastMidnight
		data.sort(function(a, b){
			return [a.vehicleId, a.secondsPastMidnight] < [b.vehicleId, b.secondsPastMidnight] ? -1 : 1;});

		// number of data records
		var length = data.length;
		
		// construct a friendlier dataset
		items = [];

		// loop through all data
		for(var i=0; i<length; i++){
				
			var item;			

			// check if at end of data
			if ((i+1) < length){

				// check if additional data matching vehicleId
				if (data[i].vehicleId == data[i+1].vehicleId)
				{
					// if interval is greater than 5 mins between reports
					// the data is likely from another part of the day
					var interval = data[i+1].secondsPastMidnight - data[i].secondsPastMidnight; 
					if (interval > 300){
						item = buildItem(data[i], data[i],color);
					}
					else {
						item = buildItem(data[i], data[i+1],color);
					}
				}
				else{
					var a = 255 - parseInt(i*0.5);
					var b = 0 + parseInt(i*0.5);
					var c = 0 + parseInt(i*0.5);
					color = 'rgba(' + a + "," + b + "," + c + ",.7)";
					//console.log("color="+color);
					item = buildItem(data[i], data[i],color);
					
				}
			}
			else{
				item = buildItem(data[i], data[i],color);
			}

			items.push(item);
		}
		return items;
	}

	function buildItem(current, next, color){
		var item = {'vehicleId':current.vehicleId,
					'latStart':current.lat,
					'lonStart':current.lon,
					'latEnd':next.lat,
					'lonEnd':next.lon,
					'timeStart':current.secondsPastMidnight,
					'timeEnd':next.secondsPastMidnight,
					'color':color
				};
		return item;
	}