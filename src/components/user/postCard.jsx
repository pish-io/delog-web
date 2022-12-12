// import React from 'react';
// import Link from 'next/link';
// import { Row, Col, Comment, Typography, Image } from 'antd';
// import dynamic from 'next/dynamic';

// const PostAvatar = dynamic(() => import('/components/post/PostAvatar'), {
//   ssr: false,
// });

// // import styles from './postCard.module.css';
// const { Title, Paragraph } = Typography;

// const PostCard = ({ post, userName }) => {
//   const getPostLink = () => {
//     return `/@${post.author}/${post.permlink}`;
//   };

//   const getThumbnailImage = () => {
//     if (post.json_metadata.image && post.json_metadata.image.length > 2) {
//       return (
//         <Image
//           preview={false}
//           src={
//             'https://api.delog.io/api/v1/images/thumbnail?url=' +
//             encodeURIComponent(post.json_metadata.image)
//           }
//           alt={post.title}
//         />
//       );
//     }
//   };

//   return (
//     <Row align="top" className="mt-5 mb-8">
//       <Col span={18}>
//         <Comment
//           author={post.author}
//           avatar={userName !== post.author && <PostAvatar userId={post.author}></PostAvatar>}
//           datetime={post.created}
//           content={
//             <Link href={getPostLink()}>
//               <a style={{ textDecoration: 'none', color: '#262626' }}>
//                 <Title level={4}>{post.title}</Title>
//                 {/* <Paragraph className="text-base" ellipsis={{ rows: 3 }}>
//                   {post.body}
//                 </Paragraph> */}
//               </a>
//             </Link>
//           }
//         />
//       </Col>
//       <Col span={6} className="mt-7">
//         {getThumbnailImage()}
//       </Col>

//       <Col xs={17}>
//         <Comment
//           content={
//             <Link href={getPostLink()}>
//               <a style={{ textDecoration: 'none', color: '#262626' }}>
//                 <Paragraph className="text-base" ellipsis={{ rows: 3 }}>
//                   {post.body}
//                 </Paragraph>
//               </a>
//             </Link>
//           }
//         />
//       </Col>
//     </Row>
//   );
// };

// export default PostCard;
