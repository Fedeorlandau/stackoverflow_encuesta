const fs = require('fs'); 
const csv = require('csv-parser');

const results = {};
const countries = ['Argentina', 'India', 'United States', 'Australia'];

countries.forEach(country => {
	results[country] = {
		people: 0,
		degree: 0,
		master: 0,
		other: 0
	}
})


fs.createReadStream('survey_results_public.csv')
.pipe(csv())
.on('data', function(data){
    try {
    	if(countries.includes(data.Country)) {
			results[data.Country].people++;
			const formalEducation = data.FormalEducation.toLowerCase();
			if(formalEducation.indexOf('master') >= 0){
				results[data.Country].master++;
			}else if(formalEducation.indexOf('bachelor')  >= 0){
				results[data.Country].degree++;
			}else {
				results[data.Country].other++;
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
   		console.log(`Degree: ${results[country].degree / results[country].people * 100}`)
   		console.log(`Master: ${results[country].master / results[country].people * 100}`)
   		console.log(`Other: ${results[country].other / results[country].people * 100}`)
	})
});  