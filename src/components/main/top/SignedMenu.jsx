import Link from 'next/link';
import { useRouter } from 'next/router';
// import { message } from 'antd';

export default function SigninMenu({ username, client }) {
  const router = useRouter();

  function clickSignout() {
    // when use hivesigner
    if (client) {
      //   const hide = message.loading('Sign out in progress..', 0);
      //   client.revokeToken(function (err, res) {
      //     setTimeout(hide, 0);
      //     message.success('Sign out');
      //     localStorage.removeItem('hivesigner');
      //     router.reload();
      //   });
      // } else {
      //   message.success('Sign out');
      //   localStorage.removeItem('keychain');
      //   router.reload();
    }
  }

  return (
    <div className="flex justify-center">
      <div className="block pt-2 pb-5 px-5 rounded-lg shadow-lg bg-white " style={{ width: 160 }}>
        <Link href={`/@${username}`}>
          <button
            type="button"
            className="w-full py-1 text-neutral-600 bg-transparent
            rounded-full outline-none 
            ease-linear transition-all duration-150
            hover:text-white
            hover:bg-neutral-800
            active:bg-neutral-500 
            focus:outline-none"
          >
            @{username && username}
          </button>
        </Link>

        <div className="mt-5">
          <button
            type="button"
            className="w-full py-1 text-neutral-600 bg-transparent
            rounded-full outline-none 
            ease-linear transition-all duration-150
            hover:text-white
            hover:bg-neutral-800
            active:bg-neutral-500 
            focus:outline-none"
            onClick={clickSignout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
