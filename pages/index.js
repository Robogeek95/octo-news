import axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function SMSPortal() {
  const [error, setError] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [purpose, setPurpose] = useState("");
  const [schedule, setSchedule] = useState("");
  const [recipients, setRecipients] = useState([{ phone_number: "" }]);

  function handleChange(e, i) {
    const { name, value } = e.target;

    switch (name) {
      case "sender":
        setSender(value);
        return;
      case "message":
        setMessage(value);
        return;
      case "purpose":
        setPurpose(value);
        return;
      case "schedule":
        setSchedule(value);
        return;
      case "number":
        let newRecipients = [...recipients];
        recipients[i].phone_number = value;
        setRecipients(newRecipients);
        return;
      default:
        return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      sender,
      recipients,
      purpose,
      text: message,
      send_at: schedule,
    };

    console.log({ payload });

    axios
      .post(
        `${process.env.NEXT_PUBLIC_OCTOPUSH_BASE_API_URL}/sms-campaign/send`,
        payload,
        {
          headers: {
            ContentType: "application/json",
            "api-key": process.env.NEXT_PUBLIC_OCTOPUSH_API_KEY,
            "api-login": process.env.NEXT_PUBLIC_OCTOPUSH_API_LOGIN,
            "cache-control": "no-cache",
          },
        }
      )
      .then((response) => {
        setData({});
        console.log(response.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.error(err);
      });
  }

  return (
    <div className=" bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto my-20">
        <div className=" w-2/5 mx-auto">
          <p className="text-3xl">Welcome back</p>
          <form className="mt-10" onSubmit={handleSubmit}>
            <p className="text-red-400 text-xl">{error}</p>
            <div className="mb-4">
              <label htmlFor="sender">Sender</label>
              <input
                type="text"
                name="sender"
                id="sender"
                value={sender}
                onChange={handleChange}
                placeholder="Sender of the message"
                className="p-2 border-2 border-gray-400 w-full"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message">Message</label>
              <textarea
                rows={7}
                type="text"
                id="message"
                name="message"
                value={message}
                maxLength={1224}
                placeholder="message"
                onChange={handleChange}
                className="p-2 border-2 border-gray-400 w-full"
              />
            </div>

            <div className="">
              <div className="flex justify-between mb-2">
                <label htmlFor="reciepient">Reciepients</label>

                <button
                  className="p-1 border-2 border-gray-400 "
                  type="button"
                  onClick={() =>
                    setRecipients([...recipients, { phone_number: "" }])
                  }
                >
                  New
                </button>
              </div>
              {recipients.map((contact, i) => (
                <input
                  key={`contact-${i}`}
                  type="text"
                  name="number"
                  id="sender"
                  value={contact.phone_number}
                  onChange={(e) => handleChange(e, i)}
                  placeholder="Phone number"
                  className="p-2 border-2 border-gray-400 w-full mb-4"
                />
              ))}
            </div>

            <div className="mb-4">
              <label htmlFor="purpose">Purpose</label>
              <select
                id="purpose"
                name="purpose"
                value={purpose}
                onChange={handleChange}
                className="p-2 border-2 border-gray-400 w-full"
              >
                <option>wholesale</option>
                <option>alert</option>
              </select>
            </div>

            <div className="mb-10">
              <label htmlFor="schedule">Schedule</label>
              <input
                type="date"
                id="schedule"
                name="schedule"
                value={schedule}
                onChange={handleChange}
                className="p-2 border-2 border-gray-400 w-full"
              />
            </div>

            <button
              type="submit"
              className="p-2 border-2 border-gray-400 w-full bg-blue-800 text-white"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
