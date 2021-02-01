const fs = require('fs')

class appModel {

    constructor() {
        this.attribute = ""
    }

    readFileContent(file) {
        return new Promise((resolve, reject) => {
            fs.open(file, 'r', (err) => {
                if (err) {
                    resolve('file does not exist')
                } else {
                    var readStream = fs.createReadStream(file)
                    resolve(readStream)
                }
            })
        })
    }

    appendToFile(file, pattern) {
        return new Promise(async (resolve, reject) => {
            const done = await this._ifExists(file, pattern)
            if (done === 'data was added to list!') {
                resolve(done)
            } else if (done === 'data should add') {
                fs.appendFile(file, pattern + '\r\n', (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('data was added to list!')
                    }
                })
            } else {
                reject('data was NOT added to list!')
            }
        })
    }

    _ifExists(file, pattern) {
        return new Promise((resolve, reject) => {
            fs.open(file, 'r', (err) => {
                if (err) {
                    resolve('file does not exist')
                } else {
                    fs.readFile(file, {
                        encoding: 'utf-8'
                    }, (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            if (data.indexOf(pattern) != -1) {
                                resolve('data was added to list!')
                            } else {
                                resolve('data should add')
                            }
                                
                        }
                    })
                }
            })
        })
    }
}

module.exports = new appModel()



////////////////////////////

// const {
//     dataStorageClient,
//     dataMapClient
// } = require('../../../db')

// // Todo: clean this sh*tty code :)))
// // const { promisify } = require("util")
// // const getAsync = promisify(dataStorageClient.hgetall).bind(dataStorageClient)
// // getAsync(id).then(res => {results.push(res)}).catch(err => {console.log("error");})

// const getAllEmployees = () => {

//     return new Promise((resolve, reject) => {

//         try {
//             if (dataStorageClient.connected) {
//                 dataStorageClient.keys("*", (err, obj) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         if (!obj) {
//                             reject("Employee not found.")
//                         } else {
//                             var promises = []
//                             var results = []
//                             obj.forEach(id => {
//                                 promises.push(
//                                     getEmployeeById(id.split(":")[1]).then(res => {
//                                         results.push(JSON.parse(res))
//                                     }).catch(err => {
//                                         console.log("error" + err)
//                                     }))
//                             })
//                             Promise.all(promises).then(() => {
//                                 // console.log(results);
//                                 resolve(results)
//                             })
//                         }
//                     }
//                 })
//             } else {
//                 reject("database is down!")
//             }

//         } catch (error) {
//             reject("database is down!")
//         }
//     })
// }

// const getEmployeeById = (id) => {

//     return new Promise((resolve, reject) => {
//         try {
//             if (dataStorageClient.connected) {

//                 dataStorageClient.exists("id:" + id, (err, ok) => {
//                     if (ok !== 1) {
//                         reject("User not Found.")
//                     } else {
//                         dataStorageClient.hgetall("id:" + id, (err, obj) => {

//                             if (err) {
//                                 reject(err)
//                             } else {
//                                 if (!obj) {
//                                     reject("User not found.")
//                                 } else {
//                                     obj.id = id
//                                     resolve(JSON.stringify(obj))
//                                 }
//                             }
//                         })
//                     }
//                 })

//             } else {
//                 reject("database is down!")
//             }
//         } catch (error) {
//             reject("database is down!")
//         }
//     })

// }

// const createEmployee = (user) => {

//     return new Promise((resolve, reject) => {

//         try {
//             if (dataStorageClient.connected) {
//                 dataStorageClient.exists("id:" + user.id, (err, ok) => {
//                     if (ok !== 1) {
//                         const dataStorageRes = dataStorageClient.hmset("id:" + user.id, [
//                             'id', user.id,
//                             'data:', user.data
//                         ])
//                         const dataMapRes = dataMapClient.hmset("id:" + user.id, [
//                             'id', user.id,
//                             'parent', user.parent
//                         ])
//                         //(dataStorageRes && dataMapRes) ? resolve(dataStorageRes && dataMapRes) : reject(dataStorageRes && dataMapRes)
//                         if (dataStorageRes) {
//                             if (dataMapRes) {
//                                 resolve(dataStorageRes && dataMapRes)
//                             } else {
//                                 reject("Parent data for this id not inserted.")
//                             }
//                         } else {
//                             reject("Data for this id not inserted.")
//                         }
//                     } else {
//                         reject("This id already exist.")
//                     }
//                 })
//             } else {
//                 reject("database is down!")
//             }

//         } catch (error) {
//             reject("database is down!")
//         }
//     })
// }

// const updateEmployee = (id, user) => {

//     return new Promise((resolve, reject) => {

//         try {
//             if (dataStorageClient.connected) {
//                 dataStorageClient.exists("id:" + id, (err, ok) => {
//                     if (ok === 1) {
//                         const dataStorageRes = dataStorageClient.hmset("id:" + user.id, [
//                             'id', user.id,
//                             'data:', user.data
//                         ])
//                         const dataMapRes = dataMapClient.hmset("id:" + user.id, [
//                             'id', user.id,
//                             'parent', user.parent
//                         ])
//                         dataStorageClient.del("id:" + id)
//                         dataMapClient.del("id:" + id)
//                         //(dataStorageRes && dataMapRes) ? resolve(dataStorageRes && dataMapRes) : reject(dataStorageRes && dataMapRes)
//                         if (dataStorageRes) {
//                             if (dataMapRes) {
//                                 resolve(dataStorageRes && dataMapRes)
//                             } else {
//                                 reject("Parent data for this id not inserted.")
//                             }
//                         } else {
//                             reject("Data for this id not inserted.")
//                         }
//                     } else {
//                         reject("This id does not exsist.")
//                     }

//                 })
//             } else {
//                 reject("database is down!")
//             }

//         } catch (error) {
//             reject("database is down!")
//         }
//     })
// }

// const deleteEmployee = (id) => {

//     return new Promise((resolve, reject) => {

//         try {
//             if (dataStorageClient.connected) {
//                 dataStorageClient.exists("id:" + id, (err, ok) => {
//                     if (ok !== 1) {
//                         reject("User not Found.")
//                     } else {
//                         dataStorageClient.del("id:" + id, (err, obj) => {
//                             dataMapClient.del("id:" + id)
//                             if (err) {
//                                 reject(err)
//                             } else {

//                                 resolve(`This id (${id}) is deleted.`)

//                             }
//                         })
//                     }
//                 })
//             } else {
//                 reject("database is down!")
//             }
//         } catch (error) {
//             reject("database is down!")
//         }
//     })
// }

// module.exports = {
//     getEmployeeById,
//     createEmployee,
//     updateEmployee,
//     deleteEmployee,
//     getAllEmployees
// }