var request = require('request');
var frisby = require('frisby');


var URL = 'http://localhost:2000';

frisby.create('GET users')
  .get(URL + '/users')
  .expectStatus(200)
  .expectJSONTypes('?',{
    id: Number,
    name_first: String,
    name_last: String,
    username: String,
    email: String
  })
  .inspectJSON()
  // 'afterJSON' automatically parses response body as JSON and passes it as an argument
  .afterJSON(function(user) {
    // You can use any normal jasmine-style assertions here
    expect(1+1).toEqual(2);

    // Use data from previous result in next test
    /*
    frisby.create('Update user')
      .put(URL_AUTH + '/users/' + user.id + '.json', {tags: ['jasmine', 'bdd']})
      .expectStatus(200)
    .toss();
    */
  })
.toss();

frisby.create('GET events')
  .get(URL + '/events?start=1385884800&end=1389513600&_=1387779451078')
  .expectStatus(200)
  .expectJSONTypes('?',{
    id: Number,
    title: String,
    start: String,
    end: String,
    allDay: Boolean
  })
  // .inspectJSON()
  // 'afterJSON' automatically parses response body as JSON and passes it as an argument
  .afterJSON(function(json) {
  	var row = json[0];
  	// console.log(json[0]);
    expect(row.allDay).toEqual(false);
  })
.toss();