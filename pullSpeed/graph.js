d3.csv("SpeedTimeLog.csv", function(d) {
	d.size = d.size.replace(/ /g,'');
	var sizeUnit = d.size.substring(d.size.length-4,d.size.length);
	if (d.size!= "0MiB"){
		d.size = d.size.substring(0,d.size.length-4);
		if (sizeUnit === "MiB"){
			d.size = parseFloat(d.size)*1000;
		}
		else if (sizeUnit === "GiB"){
			d.size = parseFloat(d.size)*1000*1000;
		}
	}
	return {
		date : d.date.substring(0, d.date.length-7),
		size: d.size==="0MiB"?0:d.size,
		time: d.time,
		unit: sizeUnit,
		hash: d.hash
	};
}, function(data) {
	//console.log(data);
	generateChart("#chart", data);
	//generateChart("#blr_chart,blr_data);	
});

d3.csv("sorted.csv", function(d) {
        d.size = d.size.replace(/ /g,'');
        var sizeUnit = d.size.substring(d.size.length-3,d.size.length);
	if (d.size!= "0MiB"){
		d.size = d.size.substring(0,d.size.length-4);
		if (sizeUnit === "MiB"){
			d.size = parseFloat(d.size)*1000;
		}
		else if (sizeUnit === "GiB"){
			d.size = parseFloat(d.size)*1000*1000;
		}
	}
        return {
                date : d.date.substring(0, d.date.length-7),
                size: d.size==="0MiB"?0:d.size,
                time: d.time,
                unit: sizeUnit,
                hash: d.hash
        };
}, function(data) {
        //console.log(data);
        generateChart("#blr_chart", data);
        //generateChart("#blr_chart,blr_data);
});

function generateChart(div, data){
	var chart = c3.generate({
		bindto: div,

		data: {
			x: 'date',
			xFormat: '%Y-%m-%dT%H:%M:%S',
			json: data,
			type: 'line',
			keys: {
				x: 'date',
				value: ['time','size','hash']
			},

			axes:{
				time: 'y',
				size: 'y2'
			}
		},
		names: {
			time: 'Pull Time'
		},
		axis:{
			x: {
				type: 'timeseries', //date format in CSV file needs to be 2000-06-14
				tick: {
					format: '%m-%d %H:00'
				}
			},
			y2:{
				show: true
			}
		},
		zoom: {
			enabled: true
		},
		subchart: {
			show: true
		},
		tooltip: {
			grouped: true,
			format: {
				value: function(value,ratio,id,index) {
					if (id === 'hash')
						return data[index]['hash'];
					else if (id ==='size')
						return data[index]['size']+'KiB'+', '+data[index]['hash'];
					else return data[index]['time'] + 's';
//					return id === 'hash'?data[index]['hash']:data[index]['time'];
				},
				name: function(name, ratio, id, index){
					if (id === 'hash')
                                                return 'hash';
                                        else if (id ==='size')
                                                return 'size'+', hash';
                                        else return 'time';
				}
				
			}
			
		}
	});
}
