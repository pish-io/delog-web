import { Link } from 'react-router-dom';

const defaultStyle = 'inline-block p-3 pb-2 rounded-t-lg border-b-2 keychainify-checked';
const activeStyle =
  'font-normal active text-gray-900 border-gray-900 dark:text-white-500 dark:border-white-500';
const unActiveStyle =
  'font-normal border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';

function isActive(location, tabName) {
  const path3 = location.pathname.split('/')[3];
  if (location.pathname === '/') {
    return 'hot' === tabName ? activeStyle : unActiveStyle;
  } else if (path3) {
    return path3 === tabName ? activeStyle : unActiveStyle;
  }
}

export default function MainTab({ location }) {
  isActive(location, 1);
  return (
    <div className="mt-14 mb-10 font-helvetica">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link to="/tag/*/hot" className={`${defaultStyle} ${isActive(location, 'hot')}`}>
              Hot
            </Link>
          </li>
          <li className="mr-2">
            <Link
              to="/tag/*/trending"
              className={`${defaultStyle} ${isActive(location, 'trending')}`}
            >
              Trending
            </Link>
          </li>
          <li className="mr-2">
            <Link to="/tag/*/latest" className={`${defaultStyle} ${isActive(location, 'latest')}`}>
              Latest
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
