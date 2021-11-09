
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test.sh

# e2e tests
$ npm run test.sh:e2e

# test.sh coverage
$ npm run test.sh:cov
```

## Managing Transactions
## 1. change  /etc/mongod.conf file
```bash
# where to write logging data.
systemLog:
destination: file
logAppend: true
path: /var/log/mongodb/mongod.log
 
# network interfaces
net:
port: 27017
bindIp: 0.0.0.0
 
# how the process runs
processManagement:
timeZoneInfo: /usr/share/zoneinfo
 
#security:
 
#operationProfiling:
 
replication:
replSetName: mongoset
 
#sharding:
## Enterprise-Only Options:
## Enterprise-Only Options:
#auditLog:
#snmp:
```
## 2.Save and exit
## 3. Then enter following commands into the command line

```bash
sudo mongod --replSet sedukh --logpath "1.log" --dbpath rs1 --port 27017
```

```bash
sudo mongod --replSet sedukh --logpath "2.log" --dbpath rs2 --port 27018
```

```bash
sudo mongod --replSet sedukh --logpath "3.log" --dbpath rs3 --port 27019
```

## 4. Enter to mongo shell by

```bash
 mongo
```

## 5. Copy and paste
```bash
config = { _id: "sedukh", members: [
{_id: 0, host: "localhost:27017"}
]}
```

```bash
rs.initiate(config)
```

## 6. Copy and paste
```bash
rs.add("localhost:27018")
```
```bash
rs.add("localhost:27019")
```
