import { useState } from "react";
import API from "../api/axios";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "new",
    source: "website",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await API.post("/leads", formData);

      alert("Lead Created");

      window.location.reload();

    } catch (error) {
      alert("Error creating lead");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow mb-6"
    >

      <h2 className="text-2xl font-bold mb-4">
        Create Lead
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Name"
          className="border p-3 rounded"
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <select
          className="border p-3 rounded"
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value,
            })
          }
        >
          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="qualified">
            Qualified
          </option>

          <option value="lost">
            Lost
          </option>
        </select>

        <select
          className="border p-3 rounded"
          onChange={(e) =>
            setFormData({
              ...formData,
              source: e.target.value,
            })
          }
        >
          <option value="website">
            Website
          </option>

          <option value="instagram">
            Instagram
          </option>

          <option value="referral">
            Referral
          </option>
        </select>

      </div>

      <button className="mt-4 bg-black text-white px-6 py-3 rounded">
        Add Lead
      </button>

    </form>
  );
};

export default LeadForm;