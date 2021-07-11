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
})
```

`mask` defaults to `'*'` if not passed.

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

# License
MIT