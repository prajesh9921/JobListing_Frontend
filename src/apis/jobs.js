import axios from "axios";

const baseurl = process.env.REACT_APP_BACKEND_API;
const token = localStorage.getItem('token');

const toGetJobDetails = async (jobid, setLoading) => {
  try {
    setLoading(true)
    const url = `${baseurl}/job/jobdetail/${jobid}`;
    const resposne = await axios.get(url, {
      headers: { 'Authorization' : token}
    });
    setLoading(false);
    return resposne?.data?.data;

  } catch (error) {
    setLoading(false);
    console.log("error fetching job details", error);
  }
};

const toCreateJob = async (data, setLoading) => {
  try {
    setLoading(true);
    const url = `${baseurl}/job/create`;
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.post(url, data);
    setLoading(false);
    return response.data;
  } catch (error) {  
    setLoading(false);
    console.log("Error creating job", error);
  }
};

const toEditJob = async (data, setLoading, id) => {
  try {
    setLoading(true);
    const url = `${baseurl}/job/editjob/${id}`;
    axios.defaults.headers.common['Authorization'] = token;
    const response = await axios.put(url, data)
    setLoading(false);
    return response.data;
  } catch (error) {  
    setLoading(false);
    console.log("Error creating job", error);
  }
};

const toGetAllJobs = async (data, setLoading, id) => {
  try {
    setLoading(true);
    const skills = data.skills.join(',');
    const url = `${baseurl}/job/all-jobs?title=${data.title}&skills=${skills}`;
    const response = await axios.get(url);
    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    console.log("Error creating job", error);
  }
};

export { toGetJobDetails, toCreateJob, toGetAllJobs, toEditJob };
