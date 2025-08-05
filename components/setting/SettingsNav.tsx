'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CgProfile, CgLock  } from "react-icons/cg";


const navigation = [
  { name: 'Profile', href: '/settings', icon: CgProfile },
  { name: 'Change Password', href: '/settings/change-password', icon: CgLock },
];

const SettingsNav = () => {
  const router = useRouter();
  

  return (
    <nav aria-label="Sidebar" className="flex flex-1 flex-col">
      <ul role="list" className="-mx-2 space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                  router.pathname === item.href
                    ? 'bg-gray-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                }`}>
              
                <item.icon
                  aria-hidden="true"
                  className={`h-6 w-6 ${
                    router.pathname === item.href
                      ? 'text-indigo-600'
                      : 'text-gray-400 group-hover:text-indigo-600'
                  }`}
                />
                {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsNav;