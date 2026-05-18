import type { Lead } from "../types/lead";
import API from "../api/axios";

interface Props {
  leads: Lead[];
}

const LeadTable = ({ leads }: Props) => {

  const handleDelete = async (id: string) => {
    try {

      await API.delete(`/leads/${id}`);

      alert("Lead Deleted");

      window.location.reload();

    } catch (error) {

      alert("Delete failed");

    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Source
            </th>

            <th className="p-3 text-left">
              Created
            </th>

            <th className="p-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-3">
                {lead.name}
              </td>

              <td className="p-3">
                {lead.email}
              </td>

              <td className="p-3 capitalize">

                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    lead.status === "qualified"
                      ? "bg-green-500"
                      : lead.status === "contacted"
                      ? "bg-blue-500"
                      : lead.status === "lost"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {lead.status}
                </span>

              </td>

              <td className="p-3 capitalize">
                {lead.source}
              </td>

              <td className="p-3">
                {new Date(
                  lead.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-3">

                <button
                  onClick={() =>
                    handleDelete(lead._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default LeadTable;