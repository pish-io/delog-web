import { useState } from "react";
// import { Divider, message } from 'antd';
export default function UnsignedMenu({ closeModal }) {
  const [username, setUsername] = useState("");

  // function clickKeychain() {
  //   const keychain = window.hive_keychain;
  //   try {
  //     keychain.requestHandshake(function () {
  //       const signMessage = JSON.stringify({ app: 'delog.io', username: username });
  //       keychain.requestSignBuffer(
  //         username,
  //         signMessage,
  //         'Posting',
  //         (response) => {
  //           console.log(response);
  //           if (response.success) {
  //             saveKeychainCache(response);
  //             router.reload();
  //             setTimeout(function () {
  //               message.success('Sign in was successful.');
  //             }, 500);
  //           } else if (response.error === 'ignored' || response.error === 'user_cancel') {
  //             message.warning(response.message);
  //           } else {
  //             message.error(response.message);
  //             message.info('Please try sign in again.');
  //           }
  //         },
  //         null,
  //         'Sign in to delog'
  //       );
  //     });
  //   } catch (e) {
  //     message.warning('Hive Keychain is not available.');
  //   }
  // }

  function saveKeychainCache(response) {
    localStorage.setItem(
      "keychain",
      JSON.stringify({ username: response.data.username, type: "keychain" })
    );
    closeModal();
  }

  function handleChange(event) {
    setUsername(event.target.value);
  }

  return (
    <>
      <div className="mt-12">
        {/* <Divider plain>
          <div>Sign in</div>
        </Divider> */}
      </div>

      {/* <div className="mt-12 mb-12 flex justify-center">
        <button
          className="px-8 py-1 text-neutral-600 bg-transparent
            border border-neutral-300
            rounded-full outline-none 
            ease-linear transition-all duration-150
            hover:text-white
            hover:bg-neutral-800
            active:bg-neutral-500 
            focus:outline-none"
          onClick={clickHiveSigner}
        >
          <div className="flex items-center pt-1 mb-1">
            <div className="">
              <img src="/image/hive-signer.svg" className="w-4" alt="hivesigner" />
            </div>
            <div className="text-lg ml-3">Sign in with Hivesigner</div>
          </div>
        </button>
      </div> */}

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
    </>
  );
}
