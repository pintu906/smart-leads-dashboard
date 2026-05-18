import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import { CSVLink } from "react-csv";
import LeadForm from "../components/LeadForm";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import LeadTable from "../components/LeadTable";

import type { Lead } from "../types/lead";

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [source, setSource] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const fetchLeads = async (
    searchText = search
  ) => {
    try {
      setLoading(true);

      const res = await API.get(
        `/leads?page=${page}&search=${searchText}&status=${status}&source=${source}`
      );

      setLeads(res.data.data);

      setTotalPages(
        res.data.pagination.totalPages
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        fetchLeads(value);
      }, 500),
    [status, source, page]
  );

  useEffect(() => {
    fetchLeads();
  }, [status, source, page]);

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-6">
         <LeadForm />
        <div className="flex flex-wrap gap-4 justify-between mb-6">

          <input
            type="text"
            placeholder="Search by name or email"
            className="border p-3 rounded w-[300px]"
            onChange={(e) => {
              setSearch(e.target.value);

              debouncedSearch(e.target.value);
            }}
          />

          <select
            className="border p-3 rounded"
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="">
              All Status
            </option>

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
              setSource(e.target.value)
            }
          >
            <option value="">
              All Sources
            </option>

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

          <CSVLink
            data={leads}
            filename="leads.csv"
            className="bg-black text-white px-4 py-3 rounded"
          >
            Export CSV
          </CSVLink>

        </div>

        {loading ? (
          <div className="text-center text-xl">
            Loading...
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center text-xl">
            No Leads Found
          </div>
        ) : (
          <LeadTable leads={leads} />
        )}

        <div className="flex gap-4 mt-6 justify-center">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
            className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Prev
          </button>

          <span className="text-lg font-bold">
            {page}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              setPage(page + 1)
            }
            className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;