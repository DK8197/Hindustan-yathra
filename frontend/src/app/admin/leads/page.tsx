import { Mail, Phone } from 'lucide-react';
import LeadStatusButton from './LeadStatusButton';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  destination: string;
  message: string;
  handled: boolean;
  created_at: string;
}

async function getLeads(): Promise<Lead[]> {
  const response = await fetch(
    `${API_URL}/api/v1/admin/leads`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch leads');
  }

  return response.json();
}

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Leads
        </h1>

        <div className="text-sm text-gray-500">
          Total Leads: {leads.length}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-4 py-3">
                  Name
                </th>
                <th className="px-4 py-3">
                  Email
                </th>
                <th className="px-4 py-3">
                  Phone
                </th>
                <th className="px-4 py-3">
                  Destination
                </th>
                <th className="px-4 py-3">
                  Message
                </th>
                <th className="px-4 py-3">
                  Created At
                </th>
                <th className="px-4 py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {lead.name}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail
                          size={14}
                          className="text-gray-400"
                        />
                        <span>
                          {lead.email}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Phone
                          size={14}
                          className="text-gray-400"
                        />
                        <span>
                          {lead.phone_number}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {lead.destination}
                    </td>

                    <td className="max-w-sm px-4 py-3 whitespace-normal break-words">
                      {lead.message}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(
                        lead.created_at
                      ).toLocaleString(
                        'en-IN'
                      )}
                    </td>

                      <td className="px-4 py-3">
                        <LeadStatusButton
                          leadId={lead.id}
                          handled={lead.handled}
                        />
                      </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}