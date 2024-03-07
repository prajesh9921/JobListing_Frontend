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

export {toGetJobDetails}