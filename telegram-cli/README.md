# node-telegram-cli
[telegram-cli](https://github.com/vysheng/tg) wrapper for Node.js and io.js

### Usage example
```javascript
var tg = require('telegram-cli')('/root/tg/bin/telegram-cli', '/root/tg/tg-server.pub');

tg.on('ready', function() {
  tg.msg('Firstname_Lastname', "Test message");

  setTimeout(function() {
    tg.close();
  }, 3000);
});
```
