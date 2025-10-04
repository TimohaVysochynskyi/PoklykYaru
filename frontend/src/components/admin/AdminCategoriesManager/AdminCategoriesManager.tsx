import { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAdminAccessToken } from "../../../redux";
import {
  fetchAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/merch/products";
import { CategoryType } from "../../../types/Product.types";

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminCategoriesManager({ isOpen, onClose }: Props) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const accessToken = useSelector(selectAdminAccessToken);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetchAllCategories();
      setCategories(response.data);
    } catch (error) {
      toast.error("Помилка завантаження категорій");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const handleAdd = async () => {
    if (!newCategoryName.trim() || !accessToken) return;

    try {
      await addCategory({ name: newCategoryName }, accessToken);
      toast.success("Категорію додано");
      setNewCategoryName("");
      loadCategories();
    } catch (error) {
      toast.error("Помилка додавання категорії");
      console.error(error);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim() || !accessToken) return;

    try {
      await updateCategory(id, { name: editName }, accessToken);
      toast.success("Категорію оновлено");
      setEditingId(null);
      setEditName("");
      loadCategories();
    } catch (error) {
      toast.error("Помилка оновлення категорії");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!accessToken) return;
    if (!window.confirm("Видалити цю категорію?")) return;

    try {
      await deleteCategory(id, accessToken);
      toast.success("Категорію видалено");
      loadCategories();
    } catch (error) {
      toast.error("Помилка видалення категорії");
      console.error(error);
    }
  };

  const startEdit = (category: CategoryType) => {
    if (!category._id) return;
    setEditingId(category._id);
    setEditName(category.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-2xl mx-auto mt-20 bg-white rounded-lg shadow-xl p-6 max-h-[80vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Керування категоріями
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <IoCloseOutline className="h-6 w-6" />
        </button>
      </div>

      {/* Add new category */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Додати нову категорію
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Назва категорії"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={!newCategoryName.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Додати
          </button>
        </div>
      </div>

      {/* Categories list */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Існуючі категорії
        </h3>
        {loading ? (
          <p className="text-gray-500">Завантаження...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500">Категорій немає</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category._id}
                className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
              >
                {editingId === category._id ? (
                  <>
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        category._id &&
                        handleUpdate(category._id)
                      }
                      autoFocus
                    />
                    <button
                      onClick={() => category._id && handleUpdate(category._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Зберегти
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Скасувати
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-gray-800">
                      {category.name}
                    </span>
                    <button
                      onClick={() => startEdit(category)}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => category._id && handleDelete(category._id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      Видалити
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
}
