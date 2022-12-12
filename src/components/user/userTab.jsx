import { Link } from 'react-router-dom';
import ClientService from 'core/ClientService';

const defaultStyle = 'inline-block p-3 pb-2 rounded-t-lg border-b-2 keychainify-checked';
const activeStyle =
  'font-normal active text-gray-900 border-gray-900 dark:text-white-500 dark:border-white-500';
const unActiveStyle =
  'font-normal border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';

function isActive(location, tabName) {
  const splits = location.pathname.split('/');

  if (tabName === 'Post') {
    if (splits.length === 2) {
      return activeStyle;
    } else if (location.pathname.includes('/feed')) {
      return unActiveStyle;
    } else if (location.pathname.includes('/blog')) {
      return unActiveStyle;
    }
  } else if (tabName === 'Feed') {
    if (splits.length === 2) {
      return unActiveStyle;
    } else if (location.pathname.includes('/feed')) {
      return activeStyle;
    } else if (location.pathname.includes('/blog')) {
      return unActiveStyle;
    }
  } else if (tabName === 'Blog') {
    if (splits.length === 2) {
      return unActiveStyle;
    } else if (location.pathname.includes('/feed')) {
      return unActiveStyle;
    } else if (location.pathname.includes('/blog')) {
      return activeStyle;
    }
  }
}

export default function UserTab({ location }) {
  const username = location.pathname.split('/@')[1].split('/')[0];

  isActive(location, 1);
  return (
    <div className="mt-10 mb-8 font-helvetica">
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link to={`/@${username}`} className={`${defaultStyle} ${isActive(location, 'Post')}`}>
              Post
            </Link>
          </li>
          {ClientService.getUserName() && (
            <>
              <li className="mr-2">
                <Link
                  to={`/@${username}/blogs`}
                  className={`${defaultStyle} ${isActive(location, 'Blog')}`}
                >
                  Blog
                </Link>
              </li>
              {/* <li className="mr-2">
                <Link
                  to={`/@${username}/feeds`}
                  className={`${defaultStyle} ${isActive(location, 'Feed')}`}
                >
                  Feed
                </Link>
              </li> */}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
