# Split-Dashboard
Sample, Basic Split Dashboard


## Showing trafficTypes
![image](https://user-images.githubusercontent.com/1207274/211422798-e72ee457-72b8-4d7c-b50e-33cb36cc83d4.png)



## Showing Splits
![image](https://user-images.githubusercontent.com/1207274/211423001-0c18b68e-2854-47a4-85c5-47e46358aae6.png)


Can be used to show basic information on splits, trafficTypes, segments, and change requests.

To use, add your global admin api key to a .env file with the syntax `API_KEY=<api_key>` and the server side script will pick it up. 

Install the packages with `npm install` and then run with `node index.js`

This is a starting point - some enhancements will be left as exercises for the reader:
  1. Implement paging - right now this only gets the first page of all results
  2. Augment splits with split definition information
  3. Could make the tables collapsable, scrollable, sortable, searchable
  4. Implement exponential backoff for api requests as to not trip the rate limiting
  5. Add the ability to kill splits from this screen
  6. Add a refresh button to refresh the data
  7. Link back to Split's admin console for more information on the row items in the tables
  8. add tests
  
 The above are just some ideas to expand upon this to make it useful for your use case. Enjoy!
  


