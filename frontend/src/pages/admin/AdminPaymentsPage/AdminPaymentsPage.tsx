import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllOrders, AdminOrder } from "../../../services/admin/payments";
import { selectAdminAccessToken } from "../../redux";
import { setAuthHeader } from "../../../services/merch";

type SortKey = "createdAt" | "totalPrice" | "status" | "customer" | "invoiceId";

const statusColors: Record<AdminOrder["status"], string> = {
  paid: "text-green-600",
  pending: "text-yellow-600",
  failed: "text-red-600",
  expired: "text-gray-500",
  canceled: "text-gray-500",
};

export default function AdminPaymentsPage() {
  const accessToken = useSelector(selectAdminAccessToken);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<
    AdminOrder["status"] | "all"
  >("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AdminOrder | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    setAuthHeader(accessToken);
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllOrders();
        setOrders(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [accessToken]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const matchStatus =
        statusFilter === "all" ? true : o.status === statusFilter;
      const matchQuery = !q
        ? true
        : [o._id, o.invoiceId, o.reference, o.customer]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q));
      return matchStatus && matchQuery;
    });
  }, [orders, query, statusFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av === bv) return 0;
      const res = av > bv ? 1 : -1;
      return sortDirection === "asc" ? res : -res;
    });
  }, [filtered, sortKey, sortDirection]);

  const totalPages = Math.ceil(sorted.length / rowsPerPage) || 1;
  const page = Math.min(currentPage, totalPages);
  const paginated = sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const onSort = (key: SortKey) => {
    if (sortKey === key)
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  return (
    <div className="mt-6 grid gap-4">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex gap-2">
          <select
            className="border rounded-md px-2 py-1"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as AdminOrder["status"] | "all")
            }
          >
            <option value="all">Всі статуси</option>
            <option value="paid">Оплачено</option>
            <option value="pending">Очікує</option>
            <option value="failed">Помилка/Скасовано</option>
            <option value="expired">Протерміновано</option>
            <option value="canceled">Скасовано</option>
          </select>
          <input
            placeholder="Пошук (orderId/invoiceId/reference/customer)"
            className="border rounded-md px-3 py-1 w-72"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-600">Всього: {filtered.length}</div>
      </div>

      <div className="overflow-x-auto border rounded-md shadow">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-100">
              {[
                { label: "Дата", key: "createdAt" as SortKey },
                { label: "Order ID", key: "customer" as SortKey },
                { label: "Invoice", key: "invoiceId" as SortKey },
                { label: "Сума (UAH)", key: "totalPrice" as SortKey },
                { label: "Статус", key: "status" as SortKey },
                { label: "Клієнт", key: "customer" as SortKey },
                { label: "Дії", key: "createdAt" as SortKey },
              ].map((col) => (
                <th
                  key={col.label}
                  className="border px-4 py-2 text-left text-sm cursor-pointer"
                  onClick={() => onSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{col.label}</span>
                    {sortKey === col.key && (
                      <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="px-4 py-6 text-center text-sm" colSpan={7}>
                  Завантаження...
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td
                  className="px-4 py-6 text-center text-sm text-red-600"
                  colSpan={7}
                >
                  {error}
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              paginated.map((o) => (
                <tr key={o._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 text-sm">
                    {new Date(o.createdAt).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2 text-sm font-mono">
                    {o._id}
                  </td>
                  <td className="border px-4 py-2 text-sm font-mono">
                    {o.invoiceId ?? "-"}
                  </td>
                  <td className="border px-4 py-2 text-sm">{o.totalPrice}</td>
                  <td
                    className={`border px-4 py-2 text-sm font-medium ${statusColors[o.status]}`}
                  >
                    {o.status}
                  </td>
                  <td className="border px-4 py-2 text-sm font-mono">
                    {o.customer}
                  </td>
                  <td className="border px-4 py-2 text-sm">
                    <div className="flex gap-2">
                      {o.invoiceUrl && (
                        <a
                          className="px-2 py-1 text-blue-600 hover:underline"
                          href={o.invoiceUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Відкрити інвойс
                        </a>
                      )}
                      <button
                        className="px-2 py-1 text-gray-700 hover:underline"
                        onClick={() => setSelected(o)}
                      >
                        Деталі
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-3">
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        >
          Назад
        </button>
        <span className="text-sm">
          Сторінка {page} з {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        >
          Далі
        </button>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg w-[95vw] max-w-3xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">
                Замовлення {selected._id}
              </h3>
              <button
                className="text-gray-600"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
            </div>
            <div className="p-4 grid gap-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div>
                    <span className="text-gray-500">Статус:</span>{" "}
                    {selected.status}
                  </div>
                  <div>
                    <span className="text-gray-500">Сума:</span>{" "}
                    {selected.totalPrice} UAH
                  </div>
                  <div>
                    <span className="text-gray-500">Створено:</span>{" "}
                    {new Date(selected.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="text-gray-500">Оновлено:</span>{" "}
                    {new Date(selected.updatedAt).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-mono break-all">
                    <span className="text-gray-500">Customer:</span>{" "}
                    {selected.customer}
                  </div>
                  <div className="font-mono break-all">
                    <span className="text-gray-500">InvoiceId:</span>{" "}
                    {selected.invoiceId ?? "-"}
                  </div>
                  <div className="font-mono break-all">
                    <span className="text-gray-500">Reference:</span>{" "}
                    {selected.reference ?? "-"}
                  </div>
                  {selected.invoiceUrl && (
                    <div className="truncate">
                      <a
                        className="text-blue-600 hover:underline"
                        href={selected.invoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Переглянути інвойс
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mt-2 mb-1">Товари</h4>
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border px-2 py-1 text-left">Product</th>
                        <th className="border px-2 py-1 text-left">Qty</th>
                        <th className="border px-2 py-1 text-left">
                          Price (UAH)
                        </th>
                        <th className="border px-2 py-1 text-left">
                          Variation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.items.map((it, idx) => (
                        <tr key={idx}>
                          <td className="border px-2 py-1 font-mono">
                            {it.product}
                          </td>
                          <td className="border px-2 py-1">{it.quantity}</td>
                          <td className="border px-2 py-1">{it.price}</td>
                          <td className="border px-2 py-1">
                            <div className="text-xs text-gray-600">
                              {it.variation?.size &&
                                it.variation.size.length > 0 && (
                                  <div>
                                    size: {it.variation.size.join(", ")}
                                  </div>
                                )}
                              {it.variation?.color &&
                                it.variation.color.length > 0 && (
                                  <div>
                                    color: {it.variation.color.join(", ")}
                                  </div>
                                )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {selected.payment && (
                <div>
                  <h4 className="font-semibold mt-2 mb-1">Webhook payload</h4>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(selected.payment, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
