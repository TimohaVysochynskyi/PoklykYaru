import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAdminAccessToken } from "../../../redux";
import { fetchAllEvents, deleteEvent } from "../../../services/events";
import { EventType } from "../../../types/Event.types";
import Loader from "../../../components/shared/Loader/Loader";
import ErrorMessage from "../../../components/shared/ErrorMessage/ErrorMessage";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const accessToken = useSelector(selectAdminAccessToken);

  const loadEvents = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await fetchAllEvents();
      setEvents(response.data);
    } catch (e) {
      setError(true);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!accessToken) return;

    if (window.confirm(`Видалити захід "${title}"?`)) {
      try {
        await deleteEvent(id, accessToken);
        setEvents((prev) => prev.filter((event) => event._id !== id));
        toast.success("Захід видалено");
      } catch (error) {
        toast.error("Помилка видалення заходу");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Заходи</h1>
          <p className="mt-2 text-sm text-gray-700">
            Список всіх заходів організації
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="./new"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Створити захід
          </Link>
        </div>
      </div>

      {loading && (
        <div className="mt-8 flex justify-center">
          <Loader size="80" />
        </div>
      )}

      {error && <ErrorMessage />}

      {!loading && !error && events.length === 0 && (
        <div className="mt-8 text-center text-gray-500">
          Заходів поки немає. Створіть перший!
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Зображення
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Назва
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Path
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Порядок
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Дії</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                        <img
                          src={event.mainImage}
                          alt={event.title}
                          className="h-16 w-24 object-cover rounded"
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {event.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        /{event.path}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {event.order}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <Link
                          to={`./${event._id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Редагувати
                        </Link>
                        <button
                          onClick={() =>
                            event._id && handleDelete(event._id, event.title)
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          Видалити
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
