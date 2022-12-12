import { DefaultAvatar } from '../svg/Icon';

export default function Avatar({ src, alt, size }) {
  let defaultSize = 12;

  if (size) {
    defaultSize = size;
  }

  if (!src) {
    return DefaultAvatar();
  }
  return (
    <img
      src={src}
      className={`rounded-full w-${defaultSize} h-${defaultSize}`}
      alt={alt}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = '/image/grey_square.svg';
      }}
    ></img>
  );
}
