const serverRequirement = {
    hostname: 'localhost',
    port: 80
  }

  const databaseRequirement = {
    hostname: 'localhost',
    port: 6379, 
    database: 'my_local_redis_db',
    ssl: true
  }
  
  const appsDirectory = './apps'
  
  module.exports = {
    serverRequirement: serverRequirement,
    databaseRequirement: databaseRequirement,
    appsDirectory: appsDirectory
  }