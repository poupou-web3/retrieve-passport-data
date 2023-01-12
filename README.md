# retrieve-passport-data

To use instal node dependencies with yarn

```
yarn add @gitcoinco/passport-sdk-reader csv-parser csv-writer fs
```

Then run 

```
node index.js
```

The script will read addresses in data/address.csv
and create a csv in data/passport.csv
with columns : address, passport;
passport comes in a JSON format

Previously on your computer you need 
- [node](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) ``` npm install --global yarn```
