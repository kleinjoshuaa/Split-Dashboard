# Split-Dashboard
Sample, Basic Split Dashboard


## Showing trafficTypes
![image](https://user-images.githubusercontent.com/1207274/211866665-fae520c1-b377-4e14-9805-ad7007b62479.png)




## Showing Segments
![image](https://user-images.githubusercontent.com/1207274/211866735-8c00296b-4e5b-44d9-94cf-a4d7156927ac.png)


Can be used to show basic information on flags, trafficTypes, segments, and change requests.

To use, add your global admin api key to a .env file with the syntax `API_KEY=<api_key>` and your organization id with `ORG_ID=<orgId>` the server side script will pick it up. 

Install the packages with `npm install` and then run with `node index.js` and it will serve on port 3500

This is a starting point - some enhancements will be left as exercises for the reader:
  1. Implement paging - right now this only gets the first page of all results
  2. Augment splits with split definition information
  3. Augment segments with segment definition information
  3. Could make the tables collapsable, scrollable, sortable, searchable
  4. Implement exponential backoff for api requests as to not trip the rate limiting
  5. Add the ability to kill splits from this screen
  6. Add a refresh button to refresh the data
  7. Add tests
  8. Add aggregate statistics (eg. - total numbers of splits, segments, users, Live splits in production, etc. )
  9. Add server side caching of requests
  
 The above are just some ideas to expand upon this to make it useful for your use case. Enjoy!
  

