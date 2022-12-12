import { useEffect, useState } from 'react';
import User from 'client/hive/user';
import { ButtonOutline } from 'components/common/Button';
import ClientService from 'core/ClientService';
import FollowService from 'core/followService';
import toast from 'components/controller/toast';

// top users
// @beggars

function getVotingPower(voting_power) {
  if (voting_power) return voting_power / 100 + '%';
  else return '0%';
}

function getName(name, metadata) {
  if (metadata.profile && metadata.profile.name) return metadata.profile.name;
  else return name;
}

function getAbout(metadata) {
  if (metadata.profile && metadata.profile.about) return metadata.profile.about;
  else return '';
}

function getCreated(created) {
  return 'Joined in ' + created.split('-')[1] + ', ' + created.split('-')[0];
}

function getProfileImage(metadata) {
  // console.log(metadata.profile.profile_image);
  if (metadata.profile && metadata.profile.profile_image) return metadata.profile.profile_image;
  else return '';
}

export default function UserProfile({ username }) {
  const [account, setAccount] = useState(null);
  const [followCount, setFollowCount] = useState(null);
  const [relationship, setRelationship] = useState(null);

  useEffect(() => {
    getAccount();
  }, [username]);

  const getAccount = async () => {
    const account = await User.getAccount(username);
    const followCount = await User.getFollowCount(username);
    const signInUserName = ClientService.getUserName();
    if (signInUserName) {
      let relationshipBetweenAccounts = await User.getRelationshipBetweenAccounts(
        username,
        signInUserName
      );
      if (username === signInUserName) {
        relationshipBetweenAccounts.sameuser = true;
      }
      setRelationship(relationshipBetweenAccounts);
    }

    setFollowCount(followCount);

    if (account && account.name) {
      if (account.posting_json_metadata) {
        account.posting_json_metadata = JSON.parse(account.posting_json_metadata);
      } else if (account.json_metadata) {
        account.posting_json_metadata = JSON.parse(account.json_metadata);
      }

      const getAboutText = getAbout(account.posting_json_metadata).substring(0, 120);
      const el = document.querySelector("meta[name='description']");
      el.setAttribute('content', getAboutText);
      setAccount(account);
    }
  };

  function clickFollow() {
    FollowService.follow(ClientService.getClient(), username)
      .then((result) => {
        setRelationship({
          ...relationship,
          follows: true,
        });
        toast.success(result.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  function clickUnfollow() {
    FollowService.unfollow(ClientService.getClient(), username)
      .then((result) => {
        setRelationship({
          ...relationship,
          follows: false,
        });
        toast.success(result.message);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  if (!account)
    return (
      <div className="mt-10 ml-10">
        <div className="animate-pulse">
          <div className="w-48 h-3.5 mb-4 bg-gray-300 dark:bg-gray-600"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-3 mb-3 bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  return (
    <div className="mt-6 font-helvetica">
      <div className="flex">
        <div>
          <div className="mb-3 w-20">
            {/* <Avatar src={getProfileImage(account.posting_json_metadata)} alt={account.name} size={20} /> */}
            <img
              src={getProfileImage(account.posting_json_metadata)}
              className={`rounded-full w-20 h-20`}
              alt={account.name}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = '/image/grey_square.svg';
              }}
            ></img>
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div>
            {/* <div>
              {followCount.follower_count} <small className="text-gray-600">Followers</small>
            </div> */}
            {relationship && !relationship.sameuser && (
              <div>
                {relationship.follows ? (
                  <ButtonOutline onClick={clickUnfollow}>
                    <div className="w-24">Unfollow</div>
                  </ButtonOutline>
                ) : (
                  <ButtonOutline onClick={clickFollow}>
                    <div className="w-24">+Follow</div>
                  </ButtonOutline>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-4xl font-black">
        {getName(account.name, account.posting_json_metadata)}
      </div>
      <div className="text-sm">@{account.name}</div>
      <div className="mt-2 text-md text-gray-800">{getAbout(account.posting_json_metadata)}</div>

      <div className="mt-3 flex">
        <div className="">
          {account.post_count} <small className="text-gray-600">Posts</small>
        </div>
        <div className="ml-5">
          {followCount.follower_count} <small className="text-gray-600">Followers</small>
        </div>
        <div className="ml-5">
          {followCount.following_count} <small className="text-gray-600">Following</small>
        </div>
      </div>

      <div className="mt-3 flex">
        <div className="text-sm text-gray-700">{getVotingPower(account.voting_power)}</div>
        <div className="ml-7 text-sm text-gray-500">{getCreated(account.created)}</div>
      </div>
      <div className="mt-7">
        {/* <Tabs size={'small'} tabBarStyle={{ color: '#000000' }} items={items} /> */}
      </div>
    </div>
  );
}
