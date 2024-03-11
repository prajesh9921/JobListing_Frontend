import axios from "axios";

const baseurl = process.env.REACT_APP_BACKEND_API;

const toGetJobDetails = async (jobid) => {
    try {
        const url = `${baseurl}/job/jobdetail/${jobid}`;
        const resposne = await axios.get(url);
        return resposne?.data?.data;
    } catch (error) {
        console.log("error fetching job details", error);
    }
}

const toCreateJob = async (data, setLoading) => {
    try {
        setLoading(true);
        const url = `${baseurl}/job/create`;
        const response = await axios.post(url, data)
        setLoading(false);
        return response.data;
    } catch (error) {
        setLoading(false);
        console.log("Error creating job", error);
    }
}

export {toGetJobDetails , toCreateJob}