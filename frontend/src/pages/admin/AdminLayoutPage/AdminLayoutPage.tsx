import { useEffect } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { refreshAdmin } from "../../redux";
import { selectAdmin } from "../../redux";
import clsx from "clsx";

import user from "../../../assets/user.png";
import logo from "../../../assets/logo.png";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function AdminLayoutPage() {
  const dispatch: AppDispatch = useDispatch();
  const admin = useSelector(selectAdmin);

  useEffect(() => {
    dispatch(refreshAdmin());
  }, [dispatch]);

  const navigation = [
    { name: "Мерчовска", path: "./merch" },
    { name: "Оплати", path: "./payments" },
    { name: "Заходи", path: "./events" },
    { name: "Галерея", path: "./gallery" },
    { name: "Рух", path: "./movement" },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    return clsx(
      isActive
        ? "bg-gray-900 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white",
      "rounded-md px-3 py-2 text-sm font-medium"
    );
  };

  const linkClassMobile = ({ isActive }: { isActive: boolean }) => {
    return clsx(
      isActive
        ? "bg-gray-900 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white",
      "block rounded-md px-3 py-2 text-base font-medium"
    );
  };

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <Link to="/">
                    <img alt="Your Company" src={logo} className="h-10 w-10" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        className={linkClass}
                        to={item.path}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Подивитись сповіщення</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={linkClassMobile}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img alt="" src={user} className="h-10 w-10 rounded-full" />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {admin.psevdo}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {admin.phoneNumber}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Подивитись сповіщення</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
