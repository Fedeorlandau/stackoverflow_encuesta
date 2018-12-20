const fs = require('fs'); 
const csv = require('csv-parser');

const results = {};
const countries = ['Argentina', 'India', 'United States', 'Australia'];

countries.forEach(country => {
	results[country] = {
		people: 0,
		agile: 0,
		kanban: 0,
		scrum: 0,
		waterfall: 0,
		xp: 0
	}
})


fs.createReadStream('survey_results_public.csv')
.pipe(csv())
.on('data', function(data){
    try {
    	if(countries.includes(data.Country)) {
    		if(data.Methodology !== 'NA') {
    			results[data.Country].people++;
				const methodology = data.Methodology.toLowerCase();
				if(methodology.indexOf('agile') >= 0){
					results[data.Country].agile++;
				}
				if(methodology.indexOf('kanban') >= 0){
					results[data.Country].kanban++;
				}
				if(methodology.indexOf('scrum') >= 0){
					results[data.Country].scrum++;
				}
				if(methodology.indexOf('waterfall') >= 0){
					results[data.Country].waterfall++;
				}
				if(methodology.indexOf('xp') >= 0){
					results[data.Country].xp++;
				}
    		}
    		
			
   		}
    }
    catch(err) {
        console.log(err)
    }
})
.on('end',function(){
	countries.forEach(country => {
		console.log('----------------------------')
		console.log(`${country} :`)
   		console.log(`People: ${results[country].people}`)
   		console.log(`Agile: ${results[country].agile / results[country].people * 100}`)
   		console.log(`Kanban: ${results[country].kanban / results[country].people * 100}`)
   		console.log(`Scrum: ${results[country].scrum / results[country].people * 100}`)
   		console.log(`Waterfall: ${results[country].waterfall / results[country].people * 100}`)
   		console.log(`XP: ${results[country].xp / results[country].people * 100}`)
		console.log('----------------------------')
	})
});  