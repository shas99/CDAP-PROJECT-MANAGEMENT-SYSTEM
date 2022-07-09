import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProposalPresentationMarks.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ViewProposalPresentationMarks = ({history}) => {
    const [error,setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [fetchProposalPresentationMarksData, setProposalPresentationMarksData] = useState("");

    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,

                }
            }
            try{
                const { data } = await axios.get("/api/private",config);
                setPrivateData(data.data);
            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }

        const fetchProposalPresentationMarksData = async () => {
            const viewproposalpresentationmarksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                }
            };

            try{
                const { data } = await axios.get("/api/ViewMarks/viewproposalpresentationmarks",viewproposalpresentationmarksconfig);
                const viewproposalpresentationmarksArray = data.data.split("/")
                setProposalPresentationMarksData(viewproposalpresentationmarksArray[0]);

            }catch(error){

            }
        }
        fetchProposalPresentationMarksData()

        fetchPrivateDate();
    }, [history]);

}