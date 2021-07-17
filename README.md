# redactor
A configurable NodeJs redacting tool to mask sensitive information


# Installation

Using yarn 
```
yarn add @pavanandhukuri/redactor
```

Using npm

```
npm install @pavanandhukuri/redactor
```

# Configuration

Data is redacted based on two key configuration parameters: key names and regex matches in data. Both can be configured like this

```javascript
const {initialize} = require('@pavanandhukuri/redactor');

initialize({
    mask: '*',
    keyPatterns: ['creditCard.*', '.*phone.*'],
    textPatterns: ['\\d{4}-\\d{4}-\\d{4}-\\d{4}'],
    preserveDataLength: true
})
```
Following is a description of the configuration properties

| Property | Description | Optional | Default Value | 
| --- | --- | --- | --- |
| mask | Character to be replaced with | Yes | *
| keyPatterns | Keys of JSON objects are matched with these patterns to determine whether they should be maksed or not | Yes | []
| textPatterns | Values of keys in a json object are matched with these patterns to determine whether they should be maksed or not. This is applicable to all values regardless of whether those keys are matched or not. text patterns are also applied when the input is a string | Yes | []
| envVariableNames | Names of the environment variables to be redacted. If any of value corresponding to these provided environment varialbes are found. They will be redacted | Yes | []
| preserveDataLength | Determines whether the mask length should be same as the original value length. For e.g, ```abc@gmail.com``` masks to ```*************``` if this is set to true and just ```*``` if it is set to false | Yes | true



# Usage

Once setup, data can be redacted using the default exported function

```javascript
const redactor = require('@pavanandhukuri/redactor');

let data = {'creditCardNumber': '2222-3333-2222-4444', phoneNumber: '123011222'}
data = redactor(data);
console.log(data);
```

```javascript
{ creditCardNumber: '*******************', phoneNumber: '*********' }
```

**Warning:** This library does not return a deep clone or copy of the object. Though it returns a value, in case of objects and array, the original JSON object is updated with masks.

# License
MIT
