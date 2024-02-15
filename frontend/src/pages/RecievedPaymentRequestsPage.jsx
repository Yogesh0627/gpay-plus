import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { API_URL } from "../utils/constants";
import { RecievedPaymentRequest } from "../components/RecievedPaymentRequest";

export const RecievedPaymentRequestsPage = () => {
  const { userToken, userData } = useSelector((state) => state.user);
  const [recievedPaymentRequests, setRecievedPaymentRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const RECIEVED_PAYMENT_REQUESTS_API_URL =
    API_URL + "user/recieved-payment-requests";

  const getRecievedPaymentRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(RECIEVED_PAYMENT_REQUESTS_API_URL, {
        headers: { Authorization: userToken },
      });
      const data = await response?.data;
      setRecievedPaymentRequests(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecievedPaymentRequests();
  }, []);

  return (
    <div className="w-[800px] m-auto px-5 max-[800px]:w-full flex flex-col gap-2">
      <h2 className="text-center text-4xl mt-3 mb-1 pb-1 font-bold border-b max-[435px]:text-3xl">
        Recieved Payment Requests{" "}
        <span className="text-xl">({userData?.recievedPaymentRequests})</span>
      </h2>
      {loading && <p className="px-2 text-center mt-3">Loading ...</p>}
      {!loading && recievedPaymentRequests.length === 0 && (
        <p className="px-2 text-center mt-3">Nothing to show</p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {recievedPaymentRequests
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((recievedPaymentRequest) => {
            return (
              <RecievedPaymentRequest
                recievedPaymentRequest={recievedPaymentRequest}
                key={recievedPaymentRequest?._id}
              />
            );
          })}
      </div>
    </div>
  );
};