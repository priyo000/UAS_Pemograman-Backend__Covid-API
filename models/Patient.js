// import database
const dbMysql = require('../config/database')

const moment = require('moment')
// membuat class Patient
class Patient {
  // buat fungsi
  static async index(){
    return new Promise((resolve, reject) => {
        let get = 'select patients.*, status.name as status_name from patients join status on patients.status = status.id'

        dbMysql.query(get, function(error, result){
            if (error) {
                return reject(error)
            } 

            resolve(result)
        })
    })
  }

  static async detail(id){
    return new Promise((resolve, reject) => {
        let detail = 'select patients.*, status.name as status_name from patients join status on patients.status = status.id where patients.id = ?'

        dbMysql.query(detail, [id], function(error, result){
            if(error){
                return reject(error)
            }

            resolve(result)
        })
    })
  }

  static async search(name){
    return new Promise((resolve, reject) => {
        let search = 'select patients.*, status.name as status_name from patients join status on patients.status = status.id where patients.name = ?'

        dbMysql.query(search, [name], function(error, result){
            if(error){
                return reject(error)
            }

            resolve(result)
        })
    })
  }

  static async spesificData(status) {
    return new Promise((resolve, reject) => {
        let positive = 'select patients.*, status.name as status_name from patients join status on patients.status = status.id where patients.status = ?'

        dbMysql.query(positive, [status], function(error, result){
            if(error){
                return reject(error)
            }

            resolve(result)
        })
    })
  }

  static async total(status){
    return new Promise((resolve, reject) => {
        let total = 'select count(id) total from patients where status = ?'

        dbMysql.query(total, [status], function(error, result){
            if (error) {
                return reject(error)
            }

            resolve(result)
        })
    })
  }

  static async store(data){
    return new Promise((resolve, reject) => {

        let parameter = [
            data.name,
            data.phone,
            data.address,
            data.status,
            data.in_date_at,
            data.out_date_at,
            moment().format('YYYY-MM-DD HH:mm:ss')
        ]
        
        let store = 'insert into patients (name, phone, address, status, in_date_at, out_date_at, timestamp) values (?)'

        dbMysql.query(store, [parameter], function(error, result){
            if (error) {
                return reject(error)
            }

            resolve(data.name)
        })
    })
  }

  static async update(data, id){
    return new Promise((resolve, reject) => {

        let parameter = {
            name: data.name,
            phone: data.phone,
            address: data.address,
            status: data.status,
            in_date_at: data.in_date_at,
            out_date_at: data.out_date_at,
            timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        let update = 'update patients set ? where id = ?' 

        dbMysql.query(update, [parameter, id], function(error, result){
            if (error) {
                return reject(error)
            }

            resolve(result)
        })
    })
  }

  static async delete(id){
    return new Promise((resolve, reject) => {
        let detele = 'delete from patients where id = ?'

        dbMysql.query(detele, [id], function(error, result){
            if (error) {
                return reject(error)
            }

            resolve(result)
        })
    })
  }
}

// export class Patient
module.exports = Patient;
