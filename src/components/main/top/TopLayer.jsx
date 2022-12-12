import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Left, Right } from '../../layout/Layout';

import { ButtonOutline } from 'components/common/Button';
import { Modal } from 'components/common/Modal';
import toast from 'components/controller/toast';
import flowbite from 'flowbite';

function isProfilePage(location) {
  return location.pathname.includes('/@') ? true : false;
}

function logoLink(location) {
  return (
    <div className="font-helvetica">
      {isProfilePage(location) ? (
        <div className="flex">
          <span className="mt-1 font-normal text-neutral-800">DeLOG</span>
        </div>
      ) : (
        <div className="flex">
          <img src="/image/favicon-180x180.png" className="w-6 h-6 mt-1" alt="delog" />
          <span className="mt-1 font-medium text-neutral-700">DeLOG</span>
        </div>
      )}
    </div>
  );
}

export default function TopLayer({ location }) {
  const user = null;

  const [showDropDown, setShowDropDown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keychain, setKeychain] = useState(false);
  // const [client, setClient] = useState(false);

  useEffect(() => {
    const getKeychain = JSON.parse(localStorage.getItem('keychain'));
    setKeychain(getKeychain);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function getDropdown() {
    const targetEl = document.getElementById('dropdownMenu');
    const triggerEl = document.getElementById('dropdownButton');
    return new flowbite.Dropdown(targetEl, triggerEl);
  }

  function clickDropDownButton() {
    getDropdown().show();
  }

  function clickSignOut() {
    getDropdown().hide();
    localStorage.removeItem('keychain');
    toast.success('Sign out');
  }

  function getProfileImageFromHive(name) {
    return `https://images.hive.blog/u/${name}/avatar/small`;
  }

  function menuButton() {
    if (keychain) {
      return (
        <div>
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdownMenu"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
            onClick={clickDropDownButton}
          >
            <img
              className="w-8 h-8 rounded-full"
              src={getProfileImageFromHive(keychain.username)}
              alt="user photo"
            ></img>
          </button>

          <div
            id="dropdownMenu"
            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <div className="py-1">
              <a
                href={`/@${keychain.username}`}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                @{keychain.username}
              </a>
            </div>
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownButton"
            >
              <li>
                <a
                  href={`/@${keychain.username}/feeds`}
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Feeds
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="/"
                onClick={clickSignOut}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <ButtonOutline onClick={showModal}>
          <div className="w-7 h-5 ">···</div>
        </ButtonOutline>
      );
    }
  }

  return (
    <Layout>
      <Left onClick={() => setShowDropDown(false)}>
        <div className="mt-5 mb-5 flex justify-between">
          {user ? (
            <div className="flex">
              <a href="/">
                <img src="/image/favicon-180x180.png" className="w-8 h-8" alt="delog" />
              </a>
              <span className="mt-1 ml-1 mr-2">/</span>
              <span className="text-xl text-neutral-700">{user.name}</span>
            </div>
          ) : (
            <div className="flex">
              <Link to="/">{logoLink(location)}</Link>
              {!isProfilePage(location) && (
                <span className="ml-1 font-xs font-extralight text-neutral-400">alpha</span>
              )}
            </div>
          )}
          <div className="mt-1">{menuButton()}</div>
        </div>
        <Modal showModal={isModalOpen} hideModal={() => setIsModalOpen(false)}></Modal>
      </Left>
      <Right>{/* <div className="mt-1">{menuButton()}</div> */}</Right>
    </Layout>
  );
}
