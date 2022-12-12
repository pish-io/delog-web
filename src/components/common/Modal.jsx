import { useState } from 'react';
import toast from 'components/controller/toast';

export function Modal({ showModal, onClick, hideModal }) {
  const [username, setUsername] = useState('');

  function parentArea(event) {
    hideModal(false);
  }

  function childArea(event) {
    event.stopPropagation();
  }

  function handleChange(event) {
    setUsername(event.target.value);
  }

  function clickKeychain() {
    const keychain = window.hive_keychain;
    try {
      keychain.requestHandshake(function () {
        const signMessage = JSON.stringify({
          app: 'delog.io',
          username: username,
          time: new Date().getTime(),
        });
        keychain.requestSignBuffer(
          username,
          signMessage,
          'Posting',
          (response) => {
            // console.log(response);
            if (response.success) {
              saveKeychainCache(response);
              toast.success('Sign in was successful.');
              window.location.reload(false);
            } else if (response.error === 'ignored' || response.error === 'user_cancel') {
              toast.warning(response.message);
            } else {
              toast.error(response.message);
              toast.warning('Please try sign in again.');
            }
          },
          null,
          'Sign in to delog'
        );
      });
    } catch (e) {
      hideModal(false);
      toast.warning('Hive Keychain is not available. Please check if hive keychain is installed.');
    }
  }

  function saveKeychainCache(response) {
    localStorage.setItem(
      'keychain',
      JSON.stringify({ username: response.data.username, type: 'keychain' })
    );
    hideModal(false);
  }

  return (
    <>
      {showModal ? (
        <>
          <div
            className="ml-3 mr-3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={parentArea}
          >
            <div className="relative w-auto my-6 mx-auto max-w-xl" onClick={childArea}>
              {/*content*/}
              <div className="font-helvetica border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div>
                  <div className="ml-10 mr-10 mt-7 divide-y divide-gray-200">
                    <div className="mb-2 flex justify-between items-center">
                      <div className="text-sm">Sign In</div>
                      <button
                        type="button"
                        className="inline-block h-8 px-3 py-2 text-black font-medium text-xs 
                        leading-tight uppercase rounded 
                        hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 
                        focus:shadow-lg focus:outline-none focus:ring-0 
                        active:bg-gray-400
                        transition duration-150 ease-in-out"
                        onClick={hideModal}
                      >
                        x
                      </button>
                    </div>
                    <div></div>
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex justify-center">
                    <div className="block p-6 max-w-sm">
                      <h5 className="flex items-center text-gray-900 text-xl leading-tight font-medium mb-2">
                        Hive Keychain
                        <img
                          className="ml-2 bg-neutral-700 w-5 h-5 rounded-full"
                          src="/image/keychain_icon_small.png"
                        />
                      </h5>
                      <p className="text-gray-500 text-xs mb-4">
                        Hive Keychain is an extension for accessing Hive-enabled distributed
                        applications.
                      </p>
                      <div>
                        <label className="block">
                          <span className="text-gray-700">Username</span>
                          <input
                            type="text"
                            className="mt-1 p-2 pl-3
                              block
                              w-full
                              rounded-md
                              bg-gray-100
                              border-transparent
                              focus:border
                              focus:border-gray-500 
                              focus:bg-white 
                              focus:ring-0"
                            placeholder=""
                            value={username}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      <div className="mt-7 flex justify-center">
                        <button
                          type="button"
                          className="inline-block px-8 py-2.5 bg-blue-600 text-white font-medium text-xs 
                            leading-tight uppercase rounded shadow-md 
                            hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
                            focus:shadow-lg focus:outline-none focus:ring-0 
                            active:bg-blue-800 active:shadow-lg 
                            transition duration-150 ease-in-out"
                          onClick={clickKeychain}
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
