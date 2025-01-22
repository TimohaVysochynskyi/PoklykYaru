import { useState } from "react";

type Payment = {
  orderNumber: string;
  customerName: string;
  amount: number;
  status: "Paid" | "Pending" | "Cancelled";
  purchaseDate: string;
};

const paymentsData: Payment[] = [
  {
    orderNumber: "001",
    customerName: "John Doe",
    amount: 50,
    status: "Paid",
    purchaseDate: "2024-01-01",
  },
  {
    orderNumber: "002",
    customerName: "Jane Smith",
    amount: 75,
    status: "Pending",
    purchaseDate: "2024-01-02",
  },
  {
    orderNumber: "003",
    customerName: "Alice Johnson",
    amount: 100,
    status: "Cancelled",
    purchaseDate: "2024-01-03",
  },
  {
    orderNumber: "004",
    customerName: "Bob Brown",
    amount: 150,
    status: "Paid",
    purchaseDate: "2024-01-04",
  },
  // Add more data as needed
];

export default function PaymentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState<keyof Payment | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof Payment) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...paymentsData].sort((a, b) => {
    if (!sortKey) return 0;
    if (sortDirection === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    }
    return a[sortKey] < b[sortKey] ? 1 : -1;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(paymentsData.length / rowsPerPage);

  return (
    <div className="mt-6 grid gap-x-6 gap-y-10">
      <table className="table-auto w-full border-collapse border border-gray-300 shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-100">
            {[
              "Order Number",
              "Customer Name",
              "Amount",
              "Status",
              "Purchase Date",
            ].map((header, index) => (
              <th
                key={index}
                className="border border-gray-300 px-4 py-2 cursor-pointer text-left"
                onClick={() =>
                  handleSort(
                    header.toLowerCase().replace(" ", "") as keyof Payment
                  )
                }
              >
                {header}
                {sortKey === header.toLowerCase().replace(" ", "") && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((payment) => (
            <tr key={payment.orderNumber} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {payment.orderNumber}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.customerName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${payment.amount.toFixed(2)}
              </td>
              <td
                className={`
                  border border-gray-300 px-4 py-2 font-medium
                  ${payment.status === "Paid" ? "text-green-600" : payment.status === "Pending" ? "text-yellow-600" : "text-red-600"}
                `}
              >
                {payment.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.purchaseDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
