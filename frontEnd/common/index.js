import SignUp from "../src/pages/SignUp"

const backendDomain="http://localhost:8080"

const SummeryApi={
    SignUp:{
        url:`${backendDomain}/api/signup`,
        method:"post"
    }
}
export default SummeryApi;