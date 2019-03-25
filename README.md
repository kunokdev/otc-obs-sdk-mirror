# T-Systems (Telekom cloud) OBS SDK (NPM Mirror)

OBS provides object storage service through simple web service interfaces and applies to Internet applications. The object storage service is accessed and operated using the REST APIs that support standard HTTP headers and status codes.

![Logo](https://avatars1.githubusercontent.com/u/19344672?s=200&v=4)

## Documentation

Complete official documentation can be found [here](https://docs.otc.t-systems.com/en-us/sdk_nodejs_devg/obs/en-us_topic_0039873862.html).

## Installation

```
yarn add t-systems-obs-sdk
```

## Usage

### Create instance

```
// Import the OBS library.
var ObsClient = require('t-systems-obs-sdk');

// Create an instance of ObsClient.
var obsClient = new ObsClient({
       access_key_id: '*** Provide your Access Key ***',
       secret_access_key: '*** Provide your Secret Key ***',
       server : 'yourdomainname'
});

// Use the instance to access OBS.

// Close obsClient.
obsClient.close();
```

### Create bucket

```
obsClient.createBucket({
       Bucket : 'bucketname',
}, (err, result) => {
       if(err){
              console.error('Error-->' + err);
       }else{
              console.log('Status-->' + result.CommonMsg.Status);
       }
});
```

### Upload object

```
obsClient.putObject({
       Bucket : 'bucketname',
       Key : 'objectkey',
       Body : 'Hello OBS'
}, (err, result) => {
       if(err){
              console.error('Error-->' + err);
       }else{
              console.log('Status-->' + result.CommonMsg.Status);
       }
});
```

### Download object

```
obsClient.getObject({
       Bucket : 'bucketname',
       Key : 'objectkey'
}, (err, result) => {
       if(err){
              console.error('Error-->' + err);
       }else{
              console.log('Status-->' + result.CommonMsg.Status);
              if(result.CommonMsg.Status < 300 && result.InterfaceResult){
                     console.log(result.InterfaceResult.Content.toString());
              }
       }
});
```

Refer to [official documentation](https://docs.otc.t-systems.com/en-us/sdk_nodejs_devg/obs/en-us_topic_0039931046.html) for more examples.

## Contribution

No contribution welcome at this time.
