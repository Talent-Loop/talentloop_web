import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";

interface Category {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Home Cleaning",
      description: "House cleaning and tidying services",
      active: true,
    },
    {
      id: 2,
      name: "Plumbing",
      description: "Pipe repair, installation, leakage",
      active: true,
    },
    {
      id: 3,
      name: "Electrical",
      description: "Wiring, repairs, installations",
      active: true,
    },
    {
      id: 4,
      name: "Tutoring",
      description: "Academic tutoring and lessons",
      active: true,
    },
    {
      id: 5,
      name: "Catering",
      description: "Event catering and meals",
      active: false,
    },
  ]);

  const toggleCategory = (id: number) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              active: !category.active,
            }
          : category
      )
    );
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[42px] font-bold text-[#22324A]">
          Categories
        </h1>

        <p className="mt-1 text-lg text-slate-500">
          Manage the catalog of service agents
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-slate-200">
              <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-14 py-5">Name</th>
                <th className="px-8 py-5">Description</th>
                <th className="px-8 py-5 text-center">
                  Active
                </th>
                <th className="px-8 py-5 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-slate-100 last:border-none"
                >
                  <td className="px-14 py-8 text-lg font-medium text-[#22324A]">
                    {category.name}
                  </td>

                  <td className="px-8 py-8 text-lg text-slate-500">
                    {category.description}
                  </td>

                  <td className="px-8 py-8">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          toggleCategory(category.id)
                        }
                        className={`relative h-7 w-11 rounded-full transition ${
                          category.active
                            ? "bg-[#123B5D]"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`absolute top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white transition-all ${
                            category.active
                              ? "left-[22px]"
                              : "left-1"
                          }`}
                        >
                          {category.active && (
                            <FiCheck
                              size={12}
                              className="text-[#123B5D]"
                            />
                          )}
                        </span>
                      </button>
                    </div>
                  </td>

                  <td className="px-8 py-8">
                    <div className="flex items-center justify-center gap-5">
                      <button className="text-slate-400 transition hover:text-[#123B5D]">
                        <FiEdit2 size={20} />
                      </button>

                      <button className="text-slate-400 transition hover:text-red-600">
                        <FiTrash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}