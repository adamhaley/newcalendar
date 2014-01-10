var moment = require('moment');
var _ = require('underscore');
require('../modules/timeManager');

describe("DB connection strings should be set in environment variables", function(){
	it("DB_HOST should be set",function(){
		expect(process.env.DB_HOST).toBeDefined();
		
	});
	it("DB_DATABASE should be set",function(){
		expect(process.env.DB_DATABASE).toBeDefined();
		
	});
	it("DB_USER should be set",function(){
		expect(process.env.DB_USER).toBeDefined();
		
	});
	it("DB_PASSWORD should be set",function(){
		expect(process.env.DB_PASSWORD).toBeDefined();
		
	});
});