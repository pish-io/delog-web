import { useEffect, useState } from 'react';
import { ButtonSvg, ButtonOutline } from '../common/Button';
import { HeartOutlined, HeartFilled, DollarOutlined, ChatOutlined } from '../svg/IconOutlined';
import toast from 'components/controller/toast';
import VoteService from '../../core/VoteService';

export default function BottomLayer({ data, hideAvatar }) {
  const [votingPercent, setVotingPercent] = useState(10);
  const [keychain, setKeychain] = useState(null);
  const [showUpvote, setShowUpvote] = useState(false);
  const [showUpvoteLoading, setShowUpvoteLoading] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [showGetToken, setShowGetToken] = useState(0);

  useEffect(() => {
    const getVotingPercent = localStorage.getItem('votingPercent');
    if (getVotingPercent) {
      setVotingPercent(getVotingPercent);
    }

    let createKeychain = localStorage.getItem('keychain');
    if (createKeychain) {
      createKeychain = JSON.parse(createKeychain);
      setKeychain(createKeychain);
    }

    if (data && data.active_votes && createKeychain) {
      if (
        createKeychain &&
        data.active_votes.filter((item) => item.voter === createKeychain.username).length
      ) {
        setIsUpvoted(true);
      } else {
        setIsUpvoted(false);
      }
    }

    setShowUpvote(false);
    setShowGetToken(0);
  }, [data]);

  function onChangeSlider(newValue) {
    setVotingPercent(newValue.target.value);
  }

  function clickShowUpvote() {
    console.log('clickShowUpvote');
    if (keychain) {
      if (!isUpvoted) {
        setShowUpvote(true);
      }
    } else {
      toast.info('You can vote after sign in.');
    }
  }

  function clickUpvote() {
    setShowUpvoteLoading(true);
    if (!showUpvoteLoading) {
      localStorage.setItem('votingPercent', votingPercent);

      if (keychain) {
        VoteService.executeVote(keychain, data.author, data.permlink, votingPercent)
          .then((result) => {
            data.active_votes > 0 ? data.active_votes++ : (data.active_votes = 1);
            VoteService.issueToken(keychain.username, votingPercent).then((result) => {
              // console.log('issueToken', result);
              setShowGetToken(result.quantity);
              setTimeout(function () {
                setShowGetToken(0);
              }, 3900);
            });
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            setShowUpvote(false);
            setIsUpvoted(true);
          });
      }
    }
  }

  return (
    <div className="font-helvetica">
      {showUpvote ? (
        <div className={`mt-4 items-center ${!hideAvatar ? 'ml-10' : ''}`}>
          <ButtonOutline className="flex items-center p-2" onClick={clickUpvote}>
            <div className="w-20 flex items-center">
              <div className="ml-2 mr-1">
                <HeartOutlined />
              </div>
              vote
            </div>
          </ButtonOutline>

          <div className="mt-3 flex content-center items-center ">
            <input
              id="small-range"
              type="range"
              min="1"
              max="100"
              value={votingPercent}
              onChange={onChangeSlider}
              className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
            ></input>
            <div className="ml-5 mb-4">
              <label
                htmlFor="small-range"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                {votingPercent}%
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className={`mt-3 flex items-center ${!hideAvatar ? 'ml-10' : ''}`}>
          <ButtonSvg type="button" onClick={clickShowUpvote}>
            <div className="w-6 h-6">
              <div className="flex space-x-4">
                {isUpvoted ? <HeartFilled /> : <HeartOutlined />}
              </div>
            </div>
          </ButtonSvg>

          <div className="text-gray-600" style={{ fontSize: '0.9rem' }}>
            {data.active_votes.length}
          </div>

          <div className="ml-6 flex items-center text-gray-600 text-sm">
            <ChatOutlined />
            <div className="ml-1">{data.children}</div>
          </div>

          <div className="ml-6 flex items-center text-gray-600 text-sm">
            <DollarOutlined />
            <div className="ml-1">{data.payout}</div>
          </div>

          {showGetToken > 0 && (
            <div className="subheading en">
              <span className="text-right tech-adj">
                <div className="ml-3 text-transparent text-xs bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                  + {showGetToken} PISH
                </div>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
