const fs = require('fs'); 
const csv = require('csv-parser');

const results = {};
const countries = ['Argentina', 'India', 'United States', 'Australia'];

countries.forEach(country => {
	results[country] = {
		people: 0,
		devops: 0,
	}
})


fs.createReadStream('survey_results_public.csv')
.pipe(csv())
.on('data', function(data){
    try {
    	if(countries.includes(data.Country)) {
			results[data.Country].people++;
			const devType = data.DevType.toLowerCase();
			if(devType.indexOf('devops') >= 0){
				results[data.Country].devops++;
			}
   		}
    }
    catch(err) {
        console.log(err)
    }
})
.on('end',function(){
	countries.forEach(country => {
		console.log(`${country} :`)
   		console.log(`People: ${results[country].people}`)
   		console.log(`Devops: ${results[country].devops / results[country].people * 100}`)
	})
});  