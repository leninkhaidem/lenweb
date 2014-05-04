#-------------------------------------------------------------------------------------------------------------------------------------
# Description: create SSL key and certificate
# Version  : 0.1
# Developer: Lenin Khaidem
# Email ID : khaising@cisco.com
# Company  : Cisco Systems
#-------------------------------------------------------------------------------------------------------------------------------------
#!/usr/bin/bash
openssl req -new > questions.csr
openssl rsa -in privkey.pem -out server.key
openssl x509 -in questions.csr -out server.crt -req -signkey server.key -days 999
rm -rf questions.csr privkey.pem