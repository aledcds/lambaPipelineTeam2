console.log('Loading function');

exports.handler = async(event,context, callback) => {
    // TODO implement
   
    "use strict";
    // https://h9ccsk9fr1.execute-api.eu-west-1.amazonaws.com/pipelines/?pipeLineName=test-pipeline
	
	console.log( 'event:' + JSON.stringify(event.queryStringParameters));
	
	const parameters = event.queryStringParameters
	
	console.log( 'value event:' + parameters.pipeLineName );
	
	const pipelineName = parameters.pipeLineName == undefined ? 'error_': parameters.pipeLineName;
	console.log( 'params: ' + pipelineName);

 	// AWS SDK
	const AWS = require('aws-sdk');

	//Instantiate CodePipeline
	let codepipeline = new AWS.CodePipeline();

	let params = {
			name: pipelineName//pipelineName
	};
	console.log('call function');
	codepipeline.startPipelineExecution(params, function(err, data) {
	  	if (err) {
	   		console.log(err, err.stack); // an error occurred
	   	}	else {
	   		console.log('Ok');
			console.log(data); // successful response
		}           
	 });
	callback(null, `Pipeline name ${pipelineName} executed!!` );
};

