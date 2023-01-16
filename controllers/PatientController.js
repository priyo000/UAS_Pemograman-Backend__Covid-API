// import Model Patient
const PatientModel = require('../models/Patient')
// buat class PatientController
class PatientController {
  // buat fungsi
  async index(req, res){
    try {
        let response;
        let data_pasien = await PatientModel.index()

        if (data_pasien.length != 0) {
            response = {
                code: '200',
                message: 'Get All Resource',
                data: data_pasien
            }
        } else {
            response = {
                code: '404',
                message: 'Data is empty'
            }
        }

        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }
  async store(req, res) {
    try {
        let add = await PatientModel.store(req.body)
        let response = {
            code:'201',
            message: 'Resource is added successfully',
            data: await PatientModel.detail(add)
        }
        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }

async update(req, res){
    try {
        let id = req.params.id
        await PatientModel.update(req.body, id)
        let data = await PatientModel.detail(id)
        let response = {
            code:'200',
            message: 'Resource is update successfully',
            data: data
        }

        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }

async delete(req, res){
    try {
        let response
        let id = req.params.id

        let check_data = await PatientModel.detail(id)
        
        if (check_data.length != 0) {
            await PatientModel.delete(id)
            response = {
                code: '200',
                message: 'Resource is delete successfully'
            }
        } else {
            response = {
                code: '404',
                message: 'Resource not found'
            }
        }

        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }

async detail(req, res){
    try {
        let response;

        let detail_pasien = await PatientModel.detail(req.params.id)

        if (detail_pasien.length != 0) {
            response = {
                code: '200',
                message: 'Get detail resource',
                data: detail_pasien
            }
        } else {
            response = {
                code: '404',
                message: 'Resource not fund'
            }
        }

        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }
async recovered(req, res) {
    try {
        let response;

        let total_pasien= await PatientModel.total(2)
        let recovered = await PatientModel.spesificData(2)

        if (recovered.length != 0) {
            response = {
                code: '200',
                message: 'Get recovered resource',
                total: total_pasien[0].total,
                data: recovered
            }
        } else {
            response = {
                code:'404',
                message:'Recource not found'
            }
        }

        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }

async search(req, res){
    try {
        let response;

        let search_pasien = await PatientModel.search(req.params.name)

        if (search_pasien.length != 0) {
            response = {
                code: '200',
                message: 'Get searched resource',
                data: search_pasien
            }
        } else {
            response = {
                code: '404',
                message: 'Resouce not found'
            }
        }

        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }

async positive(req, res) {
    try {
        let response;

        let total_positive = await PatientModel.total(1)
        let positive = await PatientModel.spesificData(1)

        if (positive.length != 0) {
            response = {
                code: '200',
                message: 'Get positive resource',
                total: total_positive[0].total,
                data: positive
            }
        } else {
            response = {
                code:'404',
                message:'Recource not found'
            }
        }

        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }
async dead(req, res) {
    try {
        let response;

        let total = await PatientModel.total(3)
        let dead = await PatientModel.spesificData(3)

        if (dead.length != 0) {
            response = {
                code: '200',
                message: 'Get dead resource',
                total: total[0].total,
                data: dead
            }
        } else {
            response = {
                code:'404',
                message:'Recource not found'
            }
        }

        res.json(response)
    } catch (error) {
        res.json(error)
    }
  }

}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
