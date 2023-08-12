const SUCCESS = require("../constants/successMessage");
const CompanyService = require("../services/company");

const addCompanyHandler = async (req, res) => {
  const data = req.body
  const response = await CompanyService.addCompany(data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(201).json({ data: SUCCESS.COMPANY.ADD_SUCCESS, error: null })
}

const getCompanyHandler = async (req, res) => {
  const id = req.params.id
  const response = await CompanyService.getCompany(id)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: null })
}

const udpateCompanyHandler = async (req, res) => {
  const id = req.params.id
  const data = req.body
  const response = await CompanyService.updateCompany(id, data)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: SUCCESS.COMPANY.UPDATE_SUCCESS, error: null })
}

const deleteCompanyHandler = async (req, res) => {
  const id = req.params.id
  const response = await CompanyService.deleteCompany(id)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: SUCCESS.COMPANY.DELETE_SUCCESS, error: null })
}

const getCompaniesHandler = async (req, res) => {
  const response = await CompanyService.getCompanies()
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: null })
}

const getCompaniesQueryHandler = async (req, res) => {
  const query = req.query
  const response = await CompanyService.getCompaniesQuery(query)
  if (response.err)
    res.status(500).json({ data: null, error: response.err })
  else
    res.status(200).json({ data: response.data, error: null })
}

const ComapnyController = {
  addCompanyHandler,
  getCompanyHandler,
  getCompaniesHandler,
  getCompaniesQueryHandler,
  udpateCompanyHandler,
  deleteCompanyHandler,
}

module.exports = ComapnyController