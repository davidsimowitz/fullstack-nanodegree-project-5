# Neighborhood Map

============================================

Udacity - Full Stack Web Developer Nanodegree
---------------------------------------------
P5: Neighborhood Map Application

A single-page, responsive map application with components usable across modern desktop, tablet, and phone browsers. Functionality allows the user to view and filter through a list of pre-selected neighborhood restaurants. Details pertaining to the restaurants—such as its address and cross street on the map—will be available through Foursquare® to the user when selecting a restaurant.


Requirements
------------

+ A Web Browser such as [Chrome](https://www.google.com/chrome/browser/) or [Firefox](https://www.mozilla.org/en-US/firefox/new/) is installed.


Usage
-----

```bash
$ git clone https://github.com/davidsimowitz/fullstack-nanodegree-project-5.git
```
  + Above command is optional.
  + Alternatively you may download the files into the directory.

* Enter the project directory.
  ```bash
  $ cd fullstack-nanodegree-project-5
  ```
  + Verify the following files/folders are present before continuing:
    * css
    * img
    * index.html
    * js
    * README.md

* Update Client ID and Client Secret to prevent 'quota-exceeded' errors:
  + Update the 'client_id' and 'client_secret' values on lines 84–85 of the map.js file.
  ```bash
  $ fullstack-nanodegree-project-5/js/map.js
  ```
  + New values can be obtained by setting up an account through [Foursquare® Developers](https://foursquare.com/developers/apps).

* Connect to the frontend:

  + Connect to the application using your web browser.
  + (location of application file displayed below)
```bash
$ fullstack-nanodegree-project-5/index.html
```

Third-Party API
---------------
+ This application uses the Foursquare® application programming interface but is not endorsed or certified by Foursquare Labs, Inc. All of the Foursquare® logos (including all badges) and trademarks displayed on this application are the property of Foursquare Labs, Inc.

+ This application uses a Sandbox Account. In other words, this application has a hourly/daily/monthly rate limit to the Foursquare® API endpoints. After the limit if reached the application will receive a 'quota_exceeded' error until the limit is reset.
