var ldap = require('ldapjs');

var autentica = {};

autentica.login = function(email, senha, callback){

console.log(email);
console.log(senha);

var filt = '(mail='+ email +')';

var client = ldap.createClient({
  url: 'ldap://ldap.magnasistemas.com.br'
});
 
var opts = {
  filter: filt,
  scope: 'sub'
};

    client.bind(email, senha, function(err1, res) {
        if(err1)
            {
              callback(err1, null);
            }
        else
            {
                var filt = '(mail=' + email + ')';
                var opts = {
                filter: filt,
                scope: 'sub'
                };

                client.search('o=MagnaSoft', opts, function(err, res) {

                res.on('searchEntry', function(entry) {
                    callback(null, JSON.stringify(entry.object.dn));
                });
                  
                });
            }
    });


}
module.exports = autentica;

