const getStriders = require('./striders');

module.exports = results => {
  return getStriders().then(striders => {
    return new Promise (resolve => {
      let matches = [];
      
      // look for exact matches first
      for (let x = 0; x < results.length; x ++) {
        if (!results[x]) continue;
        let result = results[x].toLowerCase();
        for (let strider of striders) {
          let striderComponents = strider.split(' ');
          let firstName = striderComponents[0].toLowerCase(),
            lastName = striderComponents[striderComponents.length - 1].toLowerCase();

          if (!result || (!firstName && !lastName)) break;

          if (result.includes(strider) || 
            result.includes(firstName + ' ' + lastName) || 
            result.includes(lastName + ', ' + firstName)) {
              matches.push({
                'result' :results[x],
                'matched' : strider
              });
              break;
            }
          }
        }
      resolve(matches);
    });
  });
};