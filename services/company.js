const Company = require("../models/company")

const addCompany = async (data) => {
  try {
    const res = await Company.create(data);
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }

}
const getCompanies = async () => {
  try {
    const res = await Company.find({});
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}
const getCompany = async (id) => {
  try {
    const res = await Company.findById(id);
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}
const updateCompany = async (id, data) => {
  try {
    const res = await Company.updateOne({ _id: id }, data);
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const deleteCompany = async (id) => {
  try {
    const res = await Company.deleteOne({ _id: id });
    return { data: res, err: null }
  } catch (error) {
    return { data: null, err: error }
  }
}

const CompanyService = { getCompany, getCompanies, addCompany, updateCompany, deleteCompany }

module.exports = CompanyService