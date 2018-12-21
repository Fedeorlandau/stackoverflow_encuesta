const fs = require('fs'); 
const csv = require('csv-parser');

const results = {};
const countries = ['Argentina', 'India', 'United States', 'Australia'];

countries.forEach(country => {
	results[country] = {
		people: 0,
		yes: 0,
		no: 0,
		na: 0,
	}
})


fs.createReadStream('survey_results_public.csv')
.pipe(csv())
.on('data', function(data){
    try {
    	if(countries.includes(data.Country)) {
			results[data.Country].people++;
			const ethicsChoice = data.EthicsChoice.toLowerCase();
			if(ethicsChoice == "yes") {
				results[data.Country].yes++;
			}else if(ethicsChoice == "no") {
				results[data.Country].no++;
			}else{
				results[data.Country].na++;
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
   		console.log(`Yes: ${results[country].yes / results[country].people * 100}`)
   		console.log(`No: ${results[country].no / results[country].people * 100}`)
   		console.log(`Na: ${results[country].na / results[country].people * 100}`)

	})
});  